const router = require("express").Router();
const { Question, QuizList } = require("../../models");

router.post('/', async (req, res) => {
  try {
    const newQuestion = await Question.create({
      ...req.body,
      // question: req.body.question,
      // choice1: req.body.choice1,
      // choice2: req.body.choice2,
      // choice3: req.body.choice3,
      // choice4: req.body.choice4,
      // answer: req.body.answer,
      // quiz_id: req.body.quiz_id,
    });
    res.status(200).json(newQuestion)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateQuestion = Question.update(
      {
        question: req.body.question,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        answer: req.body.answer,
        quiz_id: req.body.quiz_id
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateQuestion) {
      res.status(400).json({ message: "Could not update question!" });
      return;
    }
    res.status(200).json({ message: "Question updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const questionData = await Question.findAll();
    const questions = questionData.map((question) => question.get({ plain: true }))
    res.render("questions", { questions });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id, {
      include: QuizList
    });
    const question = questionData.get({ plain: true });
    console.log(question)
    if (question.answer === Object.keys(question)[2]) {
      answerMatch = 'A';
    } else if (question.answer === Object.keys(question)[3]) {
      answerMatch = 'B';
    } else if (question.answer === Object.keys(question)[4]) {
      answerMatch = 'C';
    } else if (question.answer === Object.keys(question)[5]) {
      answerMatch = 'D';
    }
    question.answerMatch = answerMatch;

    res.render("question", { question });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const questionData = await Question.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!questionData) {
      res.status(404).json({ message: 'No question found with this id!' });
      return;
    }

    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;