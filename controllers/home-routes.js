const router = require("express").Router();
const withAuth = require('../utils/auth')
const { User, QuizList, Score } = require('../models');

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

router.get('/profile/scores', async (req, res) => {
  if (req.session.loggedIn) {
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
    console.log(score)
    res.render("user-scores", { score, username, loggedIn: req.session.loggedIn });
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