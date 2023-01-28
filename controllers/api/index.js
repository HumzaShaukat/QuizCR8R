const router = require("express").Router();
const question = require("./question-routes");
const quizList = require("./quiz-routes");
const homeRoutes = require('./home-routes');
const createRoutes = require('./create-routes');

router.use("/questions", question);
router.use("/quizzes", quizList);
router.use("/", homeRoutes);
router.use("/create", createRoutes);

module.exports = router;
//will be filled in after all routes created
