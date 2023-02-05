const router = require("express").Router();
const withAuth = require('../utils/auth')
const { QuizList, Question } = require('../models');

router.get('/:id', async (req, res) => {
  try {
    const quizData = await QuizList.findByPk(req.params.id, {
      include: Question,
    });
    const quiz = quizData.get({ plain: true });
    if (!quizData) {
      res.status(400).json({ message: "Quiz Not Found" });
      return;
    }
    res.render("take-quiz", { quiz, loggedIn: req.session.loggedIn, username: req.session.username });
  } catch (err) {
    res.status(500).json(err);
  }
  return;
});

module.exports = router;