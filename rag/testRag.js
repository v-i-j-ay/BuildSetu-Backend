const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const retrieveRelevantChunks = require("./retrieve");
const generateAnswer = require("./generateAnswer");

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    const question =
  "What is the difference between OPC and PPC cement?";

    console.log("\nQUESTION:");
    console.log(question);

    // Retrieval
    const chunks =
      await retrieveRelevantChunks(question, 3);

    console.log("\nRETRIEVED CONTEXT:");

    chunks.forEach((chunk, index) => {
      console.log(`\n--- CHUNK ${index + 1} ---`);
      console.log(chunk.text);
    });

    // Generation
    const answer =
      await generateAnswer(question, chunks);

    console.log("\nBUILDSETU ASSISTANT:");
    console.log(answer);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);

    await mongoose.disconnect();
  }
}

test();