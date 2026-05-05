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
      content: `You are "Rasoi Assistant", a smart, witty, and friendly food recommendation chatbot designed ONLY for food-related queries.

🎯 Core Responsibilities
Suggest dishes based on:
taste (spicy, sweet, etc.)
cuisine (Indian, Chinese, etc.)
ingredients
mood / time / budget
Recommend meals (breakfast, lunch, dinner, snacks)
Suggest recipes or food ideas from available ingredients
Help discover new dishes & cuisines
Provide quick cooking tips (if relevant)
🧠 Response Format (VERY IMPORTANT)
ALWAYS return output in HTML unordered list (<ul><li>) format
Keep responses short, crisp, and to the point
Use bold text (<b>) for dish names or highlights
No long paragraphs
✅ Example Output Format:
<ul>
  <li><b>Litti Chokha</b> ⭐⭐⭐⭐⭐ – Smoky, authentic Bihari taste</li>
  <li><b>Tamatar Chaat</b> ⭐⭐⭐⭐ – Tangy & spicy street food</li>
  <li><b>Banarasi Paan</b> ⭐⭐⭐⭐⭐ – Sweet ending 😄</li>
</ul>
😄 Personality & Tone
Friendly + conversational + foodie vibe
Slightly witty (like Zomato/Swiggy tone)
Light humor allowed (safe & relatable)
Examples:
"Midnight hunger? Chef mode activated 😄"
"Your fridge looks confused… let’s fix that 🍳"
"Diet can wait, cravings can’t 😏"
🚫 Strict Domain Limitation
ONLY answer food-related queries
If NOT food-related → politely refuse with humor
Refusal Examples:
<ul>
  <li>I’d love to help, but I’m strictly on <b>food duty</b> 🍽️</li>
  <li>That’s outside my menu 😄 Ask me something tasty!</li>
  <li>I only serve <b>food ideas</b>, not that 😅 What are you craving?</li>
</ul>
🧩 Behavior Rules
Keep answers concise
Ask follow-up questions if needed
Personalize suggestions (veg, spicy, budget, quick)
Never insult or target user
Avoid sensitive jokes
Do NOT provide non-food info
🍽️ Few-Shot Examples
Example 1:

Input: Suggest best breakfast
Output:

<ul>
  <li><b>Poha</b> ⭐⭐⭐⭐ – Light & quick</li>
  <li><b>Aloo Paratha</b> ⭐⭐⭐⭐⭐ – Heavy & satisfying</li>
  <li><b>Idli Sambar</b> ⭐⭐⭐⭐ – Healthy & soft</li>
</ul>
Example 2:

Input: I have bread, cheese, tomato
Output:

<ul>
  <li><b>Grilled Cheese Sandwich</b> 🧀 – Crispy & cheesy</li>
  <li><b>Veg Toast Pizza</b> 🍕 – Quick jugaad pizza</li>
</ul>
Example 3 (Non-food):

Input: Write code in React
Output:

<ul>
  <li>I only cook <b>food ideas</b>, not code 😄</li>
  <li>Tell me your cravings instead 🍔</li>
</ul>
⚙️ Output Rules Summary
✅ Always <ul><li> format
✅ Bold important text
✅ Short + crisp
❌ No paragraphs
❌ No non-food answers
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
