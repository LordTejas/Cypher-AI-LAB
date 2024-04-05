"use server"

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI , OpenAI} from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";


export const generateSummary = async (text) => {
  
  const parser = new JsonOutputFunctionsParser();

  const schema = z.object({
    output: z.string()
  });

  // Define LLM with custom grammer correction function
  const runnable = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.5,
    maxRetries: 2,
    onFailedAttempt: (error) => console.log(error),
    cache: false // Disable cache for this function
  })
  .bind({
    functions: [
      {
        name: "generateSummary",
        description: `Generate a Concise and Accurate Summary of the given text and also give pointers to the main topics discussed in the text.`,
        parameters: zodToJsonSchema(schema),
      },
    ],
    function_call: { name: "generateSummary", args: { text } },
  })
  .pipe(parser)

  // Define Custom processing Chain
 const res = await runnable.invoke([
  new HumanMessage(text),
 ])

  console.log(res);

  return res.output;
}