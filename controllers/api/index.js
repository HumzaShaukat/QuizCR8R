const router = require("express").Router();
const question = require("./question-routes");
const quizList = require("./quiz-routes");
const createRoutes = require('./create-routes');
const userRoutes = require('./user-routes');
const takeQuizRoutes = require('./take-quiz-routes');
const scoreRoutes = require('./score-routes');

router.use("/questions", question);
router.use("/quizzes", quizList);
router.use("/create", createRoutes);
router.use("/user", userRoutes)
router.use("/take-quiz", takeQuizRoutes)
router.use('/score', scoreRoutes)

module.exports = router;
//will be filled in after all routes created
