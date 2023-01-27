const router = require("express").Router();
const { QuizList } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newQuizList = QuizList.create({
      ...req.body,
    });
    res.redirect(".create-question.js");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateQuizList = QuizList.update(
      {
        quiz_title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateQuizList) {
      res.status(400).json({ message: "No quiz with that ID exists!" });
      return;
    }
    res.status(200).json({ message: "Quiz Name updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const quizList = await QuizList.findAll();
    res.render("quizlist", quizList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {});
