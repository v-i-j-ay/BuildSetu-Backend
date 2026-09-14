const fs = require("fs");
const path = require("path");

function loadDocument() {
  const filePath = path.join(__dirname, "../knowledge/buildsetu.txt");

  const text = fs.readFileSync(filePath, "utf-8");

  return text;
}

module.exports = loadDocument;