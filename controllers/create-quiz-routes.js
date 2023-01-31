const newRouter = require("express").Router();
const questionRouter = require("express").Router({ mergeParams: true });

newRouter.get("/", async (req, res) => {
  res.render("quiz-title-form");
});

newRouter.get("/:id/new-question", async (req, res) => {
    try {
      res.render("create");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = newRouter;