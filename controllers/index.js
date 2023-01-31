const router = require("express").Router();
const apiRoutes = require("./api");
const createQuiz = require("./create-quiz-routes");
const questionRoutes = require("./question-routes");
const homeRoutes = require("./home-routes");

router.use("/new-quiz", createQuiz);
router.use("/api", apiRoutes);
router.use("/question", questionRoutes);
router.use("/", homeRoutes);


module.exports = router;
