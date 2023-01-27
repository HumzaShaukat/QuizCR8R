const router = require("express").Router();
const withAuth = require('../../utils/auth')
const { User, QuizList, Question } = require('../../models/');

router.get('/', async (req, res) => {
    try {
      res.render('profile');
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/profile');
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