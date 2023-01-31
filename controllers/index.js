const router = require("express").Router();
const apiRoutes = require("./api");
const createQuiz = require("./create-quiz-routes");

router.use("/api", apiRoutes);
router.use("/new-quiz", createQuiz);

module.exports = router;
