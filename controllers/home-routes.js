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

router.get('/update-user', async (req, res) => {
  if (req.session.loggedIn) {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render("update-user", { user, loggedIn: req.session.loggedIn });
    console.log(user)
    return;
  }
  res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;