const router = require("express").Router();
const { QuizList, Question } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newQuizList = await QuizList.create({
      user_id: req.body.user_id,
      quiz_title: req.body.quiz_title
    });
    res.status(200).json(newQuizList.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateQuizList = QuizList.update(
      {
        quiz_title: req.body.quiz_title,
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


//temp comment
router.delete("/:id", async (req, res) => {
  try {
    const quizData = await QuizList.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!quizData) {
      res.status(400).json({ message: "No quiz found!" });
      return;
    }
    res.status(200).json(quizData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
