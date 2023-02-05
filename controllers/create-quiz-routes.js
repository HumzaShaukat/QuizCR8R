const newRouter = require("express").Router();
const withAuth = require('../utils/auth')

newRouter.get("/", withAuth, async (req, res) => {
  try {
    res.render("quiz-title-form", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

newRouter.get("/new-question/:id", withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    res.render("create", { id, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = newRouter;