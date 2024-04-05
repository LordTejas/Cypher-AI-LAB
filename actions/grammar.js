"use server"

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI , OpenAI} from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";
import { LLMChain } from "langchain/chains"


export const correctGrammar = async (text, tone) => {
  
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
        name: "correctGrammar",
        description: `Correct the grammar of the given text and revise the tone to the specified ${tone}`,
        parameters: zodToJsonSchema(schema),
      },
    ],
    function_call: { name: "correctGrammar", args: { text, tone } },
  })
  .pipe(parser)

  // Define Custom processing Chain
 const res = await runnable.invoke([
  new HumanMessage(text),
 ])

  console.log(res);

  return res.output;
}