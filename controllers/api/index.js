const router = require("express").Router();
const question = require("./question-routes");
const quizList = require("./quiz-route");

router.use("/questions", question);
router.use("/quizes", quizList);

module.exports = router;
//will be filled in after all routes created
