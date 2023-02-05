const router = require("express").Router();
const { QuizList, Question, Score, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const quizData = await QuizList.findAll();
    const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));
    res.render("quizlist", { quizzes, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const quizData = await QuizList.findByPk(req.params.id, {
      include: Question,
    });
    const quiz = quizData.get({ plain: true });
    for (var i = 0; i < quiz.questions.length; i++) {
      let answerMatch;
      if (quiz.questions[i].answer === Object.keys(quiz.questions[0])[2]) {
        answerMatch = "A";
      } else if (
        quiz.questions[i].answer === Object.keys(quiz.questions[0])[3]
      ) {
        answerMatch = "B";
      } else if (
        quiz.questions[i].answer === Object.keys(quiz.questions[0])[4]
      ) {
        answerMatch = "C";
      } else if (
        quiz.questions[i].answer === Object.keys(quiz.questions[0])[5]
      ) {
        answerMatch = "D";
      }
      quiz.questions[i].answerMatch = answerMatch;
    }
    if (!quizData) {
      res.status(400).json({ message: "Quiz Not Found" });
      return;
    }
    res.render("quizdata", { quiz, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/update-quiz/:id', withAuth, async (req, res) => {
  try {
    const quizData = await QuizList.findByPk(req.params.id);
    if (!quizData) {
      res.status(400).json({ message: "Quiz Not Found" });
      return;
    }
    const quiz = quizData.get({ plain: true });
    quizMin = quiz.time/60
    res.render("update-quiz-title", { quizMin, quiz, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/scores/:id', withAuth, async (req, res) => {
  try {
    const quizData = await QuizList.findByPk(req.params.id);
    const quizInfo = quizData.get({ plain: true })

    const scoreData = await Score.findAll({
      where: {
        quiz_id: req.params.id
      },
      order: [
        ['score', 'DESC']
      ],
      include: [{
        model: User,
        attributes: ['username']
      },
      {
        model: QuizList,
        attributes: ['quiz_title']
      }],
      attributes: ['score']
    });
    if (!scoreData) {
      res.status(400).json({ message: "Quiz Not Found" });
      return;
    }
    const score = scoreData.map((score) => score.get({ plain: true }));
    res.render("quiz-scores", { quizInfo, score, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;