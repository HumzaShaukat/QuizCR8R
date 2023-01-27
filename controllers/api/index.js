const router = require("express").Router();
const question = require("./question-routes");
const quizList = require("./quiz-routes");
const homeRoutes = require('./home-routes')

router.use("/questions", question);
router.use("/quizzes", quizList);
router.use("/", homeRoutes);

module.exports = router;
//will be filled in after all routes created
