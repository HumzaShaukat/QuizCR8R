const router = require("express").Router();
const { QuizList, Question } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newQuizList = QuizList.create({
      ...req.body,
    });
    res.status(200).json(newQuizList);
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
    const quizData = await QuizList.findAll();
    const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));
    res.render("quizlist", { quizzes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const quizData = await QuizList.findByPk(req.params.id, {
      include: Question
    });
    const quiz = quizData.get({ plain: true })
    console.log(quiz.questions)
    if (!quizData) {
      res.status(400).json({ message: "Quiz Not Found" });
      return;
    }
    res.render("quizdata", { quiz });
  } catch (err) {
    res.status(500).json(err);
  }
});
//temp comment
router.delete("/:id", async (req, res) => {
  try {
    const delQuiz = await QuizList.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delQuiz) {
      res.status(400).json({ message: "No quiz found!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
