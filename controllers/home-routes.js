const router = require("express").Router();
const withAuth = require('../utils/auth')
const { User, QuizList, Score } = require('../models');

router.get('/', withAuth, async (req, res) => {
  try {
    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
  return;
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    try {
      res.redirect('/profile');
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
  const quizData = await QuizList.findAll({
    where: { user_id: req.session.user_id }
  });
  const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));
  const username = req.session.username
  res.render("profile", { quizzes, username, loggedIn: req.session.loggedIn });
  return;
});

router.get('/profile/scores', withAuth, async (req, res) => {
  const scoreData = await Score.findAll({
    where: {
      user_id: req.session.user_id
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
      attributes: ['id', 'quiz_title']
    }],
    attributes: ['score']
  });
  const score = scoreData.map((score) => score.get({ plain: true }));
  const username = req.session.username
  res.render("user-scores", { score, username, loggedIn: req.session.loggedIn });
  return;
});

router.get('/update-user', withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
  const user = userData.get({ plain: true });
  res.render("update-user", { user, loggedIn: req.session.loggedIn });
  return;
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});

module.exports = router;