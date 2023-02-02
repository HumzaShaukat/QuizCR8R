const newRouter = require("express").Router();
const questionRouter = require("express").Router({ mergeParams: true });

newRouter.get("/", async (req, res) => {
  res.render("quiz-title-form", { loggedIn: req.session.loggedIn });
});

newRouter.get("/new-question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.render("create", { id, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = newRouter;