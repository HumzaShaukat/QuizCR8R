const router = require("express").Router();
const { Question } = require("../../models");

router.post('/question', async (req, res) => {
    try { 
      const newQuestion = await Question.create({
      question: req.body.question,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      answer: req.body.answer,
      quiz_id: req.body.quiz_id,
    });
    res.status(200).json(newQuestion)
  } catch (err) {
    res.status(400).json(err);
  }
  });