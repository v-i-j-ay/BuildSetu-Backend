const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateAnswer(question, chunks) {
  let prompt;

  if (chunks.length > 0) {
    const context = chunks
      .map((chunk) => chunk.text)
      .join("\n\n");

    prompt = `
You are BuildSetu Assistant.

Use the provided BuildSetu context as the primary source.

If the context is incomplete, you may add useful general knowledge.
Do not claim that general knowledge comes from BuildSetu.

Keep the answer clear, practical, and concise.

BUILDSETU CONTEXT:
${context}

USER QUESTION:
${question}

ANSWER:
`;
  } else {
    prompt = `
You are BuildSetu Assistant.

The BuildSetu knowledge base does not contain relevant information for this question.

Answer using your general knowledge.

Focus especially on construction, labour, contractors, suppliers,
home maintenance, hiring, and related topics when relevant.

Keep the answer clear, practical, and concise.

USER QUESTION:
${question}

ANSWER:
`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = generateAnswer;