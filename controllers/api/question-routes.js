const router = require("express").Router();
const { Question, QuizList } = require("../../models");
const withAuth = require('../../utils/auth')

// route to create a new question
router.post('/', withAuth, async (req, res) => {
  try {
    const newQuestion = await Question.create({ ...req.body });
    res.status(200).json(newQuestion)
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to update a specific question
router.put("/update-question/:id", withAuth, async (req, res) => {
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

// route to delete a question
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const questionData = await Question.destroy({ where: { id: req.params.id } });
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