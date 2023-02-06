const newRouter = require('express').Router();
const withAuth = require('../utils/auth');

// route will render the quiz-title-form handlebars
newRouter.get('/', withAuth, async (req, res) => {
  try {
    res.render('quiz-title-form', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route will render the create handlebars
newRouter.get('/new-question/:id', withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    res.render('create', { id, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = newRouter;