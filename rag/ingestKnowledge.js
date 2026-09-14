const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const mongoose = require("mongoose");

const loadDocument = require("./loadDocuments");
const chunkDocument = require("./chunkDocuments");
const generateEmbedding = require("./embeddings");

const KnowledgeChunk = require("../model/KnowledgeChunk");

async function ingestKnowledge() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    // 2. Load BuildSetu knowledge
    const text = loadDocument();

    // 3. Split into chunks
    const chunks = chunkDocument(text);

    console.log("Total chunks:", chunks.length);

    // 4. Delete old RAG knowledge
    await KnowledgeChunk.deleteMany({
      source: "buildsetu.txt",
    });

    console.log("Old knowledge removed");

    // 5. Generate embedding for each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      console.log(
        `Generating embedding ${i + 1}/${chunks.length}`
      );

      const embedding =
        await generateEmbedding(chunk);

      // 6. Save chunk + embedding
      await KnowledgeChunk.create({
        text: chunk,
        embedding: embedding,
        source: "buildsetu.txt",
      });
    }

    console.log("\nKnowledge ingestion completed ✅");

    await mongoose.disconnect();

  } catch (error) {
    console.error(
      "Knowledge ingestion failed:",
      error.message
    );

    await mongoose.disconnect();
  }
}

ingestKnowledge();