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

router.get("/:title", async (req, res ) => {

})

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
      include: Question,
    });
    const quiz = quizData.get({ plain: true });
    for (var i = 0; i < quiz.questions.length; i++) {
      let answerMatch;
      if (quiz.questions[i].answer === Object.keys(quiz.questions[0])[2]) {
        answerMatch = "A";
      } else if (
        quiz.questions[i].answer === Object.keys(quiz.questions[0])[3]
      ) {
        answerMatch = "B";
      } else if (
        quiz.questions[i].answer === Object.keys(quiz.questions[0])[4]
      ) {
        answerMatch = "C";
      } else if (
        quiz.questions[i].answer === Object.keys(quiz.questions[0])[5]
      ) {
        answerMatch = "D";
      }
      quiz.questions[i].answerMatch = answerMatch;
    }
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
