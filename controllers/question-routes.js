const router = require("express").Router();
const { Question, QuizList } = require("../models");
const withAuth = require('../utils/auth')

router.get("/", withAuth, async (req, res) => {
  try {
    const questionData = await Question.findAll({ where: { user_id: req.session.user_id } });
    const questions = questionData.map((question) => question.get({ plain: true }))
    res.render("questions", { questions, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id, {
      include: QuizList
    });
    const question = questionData.get({ plain: true });
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
    console.log(question)
    res.render("question", { question, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/update-question/:id", withAuth, async (req, res) => {
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
    res.render("update-question", { question, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;