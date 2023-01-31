const router = require("express").Router();
const { Question, QuizList } = require("../models");

router.get("/", async (req, res) => {
  try {
    const questionData = await Question.findAll();
    const questions = questionData.map((question) => question.get({ plain: true }))
    res.render("questions", { questions });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id, {
      include: QuizList
    });
    const question = questionData.get({ plain: true });
    console.log(question)
    if (question.answer === Object.keys(question)[2]) {
      answerMatch = 'A';
    } else if (question.answer === Object.keys(question)[3]) {
      answerMatch = 'B';
    } else if (question.answer === Object.keys(question)[4]) {
      answerMatch = 'C';
    } else if (question.answer === Object.keys(question)[5]) {
      answerMatch = 'D';
    }
    question.answerMatch = answerMatch;

    res.render("question", { question });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/update-question/:id", async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id, {
      include: QuizList
    });
    const question = questionData.get({ plain: true });
    console.log(question)
    if (question.answer === Object.keys(question)[2]) {
      answerMatch = 'A';
    } else if (question.answer === Object.keys(question)[3]) {
      answerMatch = 'B';
    } else if (question.answer === Object.keys(question)[4]) {
      answerMatch = 'C';
    } else if (question.answer === Object.keys(question)[5]) {
      answerMatch = 'D';
    }
    question.answerMatch = answerMatch;

    res.render("question", { question });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;