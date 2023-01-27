const router = require("express").Router();
const { Question } = require("../../models");

router.post('/', async (req, res) => {
  try {
    const newQuestion = await Question.create({
      question: req.body.question,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      answer: req.body.answer,
      quiz_id: req.body.quiz_id,
    });
    res.status(200).json(newQuestion)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:question", async (req, res) => {
  try {
    const updateQuestion = Question.update(
      {
        question: req.body.question,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        answer: req.body.answer,
        quiz_id: req.body.quiz_id,
      },
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
    const questionList = await Question.findAll();
    res.render("question", questionList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const questionId = await Question.findAll();
    res.render("question", questionId);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const questionId = await Question.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!questionId) {
      res.status(404).json({ message: 'No question found with this id!' });
      return;
    }

    res.status(200).json(questionId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;