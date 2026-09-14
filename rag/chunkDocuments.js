function chunkDocument(text) {
  // Split document whenever there is an empty line
  const paragraphs = text.split(/\n\s*\n/);

  // Clean each paragraph
  const chunks = paragraphs
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  return chunks;
}

module.exports = chunkDocument;