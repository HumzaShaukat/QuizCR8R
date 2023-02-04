const router = require("express").Router();
const withAuth = require('../utils/auth')
const { User, QuizList, Question } = require('../models');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const quizData = await QuizList.findByPk(req.params.id, {
      include: Question,
    });
    const quiz = quizData.get({ plain: true });
    console.log(quiz.questions.length)

    if (!quizData) {
      res.status(400).json({ message: "Quiz Not Found" });
      return;
    }
    res.render("take-quiz", { quiz, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
  return;
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/profile', async (req, res) => {
  console.log(req.session)
  if (req.session.loggedIn) {
    const quizData = await QuizList.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));
    const username = req.session.username
    res.render("profile", { quizzes, username, loggedIn: req.session.loggedIn });
    return;
  }
  res.redirect('/login');
});

router.get('/update-user', withAuth, async (req, res) => {
  if (req.session.loggedIn) {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render("update-user", { user, loggedIn: req.session.loggedIn });
    console.log(user)
    return;
  }
  res.redirect('/login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;