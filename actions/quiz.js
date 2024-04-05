"use server"

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI , OpenAI} from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";
import { LLMChain } from "langchain/chains"


export const generateMcqQuiz = async (textContent) => {
  
  const parser = new JsonOutputFunctionsParser();

  const schema = z.object({
    questions: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      answer: z.string()
    }))
  });

  // Define LLM with custom grammer correction function
  const runnable = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 3000,
    temperature: 1,
    maxRetries: 2,
    onFailedAttempt: (error) => console.log(error),
    cache: false // Disable cache for this function
  })
  .bind({
    functions: [
      {
        name: "generateMcqQuizzes",
        description: `Generate MCQs for the given text content`,
        parameters: zodToJsonSchema(schema),
      },
    ],
    function_call: { name: "generateMcqQuizzes" },
  })
  .pipe(parser)

  // Define Custom processing Chain
 const res = await runnable.invoke([
  new HumanMessage(textContent),
 ])

  console.log(res);

  return JSON.stringify(res.questions, null, 2);
}