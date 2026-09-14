const generateEmbedding = require("./embeddings");
const KnowledgeChunk = require("../model/KnowledgeChunk");

async function retrieveRelevantChunks(question, limit = 3, threshold = 0.82) {
  const questionEmbedding = await generateEmbedding(question);

  const results = await KnowledgeChunk.aggregate([
    {
      $vectorSearch: {
        index: "buildsetu_vector_index",
        path: "embedding",
        queryVector: questionEmbedding,
        numCandidates: 50,
        limit,
      },
    },
    {
      $project: {
        _id: 0,
        text: 1,
        source: 1,
        category: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  return results.filter((result) => result.score >= threshold);
}

module.exports = retrieveRelevantChunks;