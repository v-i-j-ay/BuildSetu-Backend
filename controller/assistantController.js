const retrieveRelevantChunks = require("../rag/retrieve");
const generateAnswer = require("../rag/generateAnswer");

const chatWithAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    // Validate question
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // 1. Retrieve relevant BuildSetu knowledge
    const chunks = await retrieveRelevantChunks(question);

    // 2. Generate final answer
    const answer = await generateAnswer(question, chunks);

    // 3. Send response to frontend
    res.status(200).json({
      success: true,
      answer,
      source: chunks.length > 0 ? "rag" : "general",
    });
  } catch (error) {
    console.error("Assistant error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate assistant response",
    });
  }
};

module.exports = {
  chatWithAssistant,
};