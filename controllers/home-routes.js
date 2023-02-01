const router = require("express").Router();
const withAuth = require('../utils/auth')
const { User, QuizList } = require('../models');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      // const quizData = await QuizList.findAll({ include: User });
      // const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));
      // const username = req.session.username
      res.redirect('/profile');
    } catch (err) {
      res.status(500).json(err);
    }
    return;
  }
  res.render('login');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/profile', async (req, res) => {
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
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;