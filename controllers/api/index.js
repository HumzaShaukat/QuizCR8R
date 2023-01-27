const router = require("express").Router();
const question = require("./question-routes");
const quizList = require("./quiz-routes");

router.use("/questions", question);
router.use("/quizzes", quizList);

module.exports = router;
//will be filled in after all routes created
