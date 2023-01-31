const router = require("express").Router();
const question = require("./question-routes");
const quizList = require("./quiz-routes");
const homeRoutes = require('./home-routes');
const createRoutes = require('./create-routes');
const userRoutes = require('./user-routes');

router.use("/", homeRoutes);
router.use("/questions", question);
router.use("/quizzes", quizList);
router.use("/create", createRoutes);
router.use("/user", userRoutes)

module.exports = router;
//will be filled in after all routes created
