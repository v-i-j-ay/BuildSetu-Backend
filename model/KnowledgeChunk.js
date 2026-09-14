const mongoose = require("mongoose");

const knowledgeChunkSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },

    source: {
      type: String,
      default: "buildsetu.txt",
    },

    category: {
      type: String,
      default: "general",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "KnowledgeChunk",
  knowledgeChunkSchema
);