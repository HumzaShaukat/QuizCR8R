const newRouter = require("express").Router();

newRouter.get("/", async (req, res) => {
  res.render("quiz-title-form");
});

newRouter.get("/new-question/:id", async (req, res) => {
    try {
      const id = req.params.id;
      res.render("create", {id});
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = newRouter;