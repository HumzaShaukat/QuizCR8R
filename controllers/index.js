const router = require('express').Router();
const apiRoutes = require('./api');
const createQuiz = require('./create-quiz-routes');
const questionRoutes = require('./question-routes');
const homeRoutes = require('./home-routes');
const quizRoutes = require('./quiz-routes');
const takeQuizRoutes = require('./take-quiz-routes');


router.use('/', homeRoutes);
router.use('/new-quiz', createQuiz);
router.use('/api', apiRoutes);
router.use('/question', questionRoutes);
router.use('/quizzes', quizRoutes);
router.use('/take-quiz', takeQuizRoutes);

module.exports = router;
