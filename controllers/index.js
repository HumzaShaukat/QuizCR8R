const router = require("express").Router();
const apiRoutes = require("./api");
const questionRoutes = require("./question-routes");
const homeRoutes = require("./home-routes");

router.use("/api", apiRoutes);
router.use("/question", questionRoutes);
router.use("/", homeRoutes);

module.exports = router;
