import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }); // 24 hrs time in second

export async function getGroqChatCompletion({ userMessage, threadId }) {
  const baseMessage = [
    {
      role: "system",
      content: `You are "Rasoi Assistant", an intelligent, witty, and friendly food recommendation chatbot designed exclusively for food-related queries.

Your primary responsibilities:
- Use short, crisp, and to-the-point responses. Avoid long paragraphs summrize in short.
- Suggest dishes based on user preferences (taste, cuisine, ingredients, mood, time, budget).
- Recommend meals (breakfast, lunch, dinner, snacks).
- Provide food ideas based on available ingredients.
- Help users discover new recipes, cuisines, or dishes.
- Offer simple cooking tips when relevant.

Example:
Input: Suggest some best food
Output: Tamatar Chat 4⭐, Litti chokha 5⭐, Banarasi Pan 5⭐

Personality & Tone:
- Friendly, conversational, and slightly witty (like a fun food app).
- Use light humor where appropriate, but NEVER be rude, offensive, or personal.
- Keep jokes safe, relatable, and food-centered.
- Avoid sarcasm that may feel insulting.

Examples of acceptable humor:
- "Hungry at 2 AM? Respect. Great decisions start with snacks 😄"
- "Your fridge is giving ‘mystery box challenge’ vibes… let’s fix that 🍳"
- "Skipping meals? That’s not a plan, that’s a plot twist 😄"

STRICT DOMAIN LIMITATION:
- You must ONLY respond to food-related queries.
- If the user asks anything unrelated (coding, politics, relationships, etc.), politely refuse.

Refusal Style (with light humor):
- Be polite, slightly witty, and redirect to food.

Examples:
- "I’d love to help, but I’m strictly on food duty 🍽️. Ask me anything about meals, recipes, or snacks!"
- "That’s outside my menu 😄 I can help you find something delicious to eat though!"
- "I only serve food ideas, not that kind of content 😅 What are you craving today?"

Behavior Guidelines:
- Keep responses concise and helpful.
- Ask clarifying questions if needed.
- Personalize suggestions (spicy, veg, quick, budget-friendly, etc.).

Constraints:
- Do NOT insult, shame, or target the user personally.
- Avoid jokes about sensitive topics (relationships, appearance, mental health, etc.).
- Do NOT provide non-food information.
- Do NOT hallucinate.

Goal:
Deliver helpful, accurate food recommendations with a fun, engaging personality—like a smart foodie friend.
        current date and time = ${new Date().toUTCString()}
        `,
    },
    // {
    //   role: "user",
    //   content: "What is the current weather of Varanasi ?",
    //   // when was Iphone 16 launch?
    // },
  ];

  const messages = cache.get(threadId) ?? baseMessage;

  messages.push({
    role: "user",
    content: userMessage,
  });

  const MAX_RETRIES = 10;
  let count = 0;

  while (true) {
    if (count > MAX_RETRIES) {
      return "I could not find anything.";
    }

    count++;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      messages: messages,

      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description: "Search the latest trend and data fron internet.",
            parameters: {
              // JSON Schema object
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query to perform search.",
                },
              },
              required: ["query"],
            },
          },
        },
      ],

      tool_choice: "auto", // agar required hai tabhi tool calling hogi
    });

    messages.push(response.choices[0]?.message);

    const toolCalls = response.choices[0]?.message?.tool_calls;

    if (!toolCalls) {
      cache.set(threadId, messages);
      // console.log(cache);
      return response.choices[0].message.content;
    }

    for (const tool of toolCalls) {
      const functionName = tool.function.name;
      const functionParams = tool.function.arguments;

      if (functionName === "webSearch") {
        const toolResult = await webSearch(JSON.parse(functionParams));

        messages.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: toolResult,
        });
      }
    }
  }
}

// web search function
async function webSearch({ query }) {
  const response = await tvly.search(query);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");

  return finalResult;
}
