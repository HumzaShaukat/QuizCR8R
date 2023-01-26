const router = require("express").Router();
const { Question } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newQuestion = await Question.create();
  } catch (err) {}
});
