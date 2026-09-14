const express = require("express");

const {
  chatWithAssistant,
} = require("../controller/assistantController");

const router = express.Router();

router.post("/chat", chatWithAssistant);

module.exports = router;