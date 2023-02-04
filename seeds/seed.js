const sequelize = require('../config/connection');
const { User, Question, QuizList, Score } = require('../models');

const userData = require('./userData.json');
const quizData = require('./quizData.json');
const questionData = require('./questionData.json');
const scoreData = require('./scoreData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create({
      ...user,
    });
  }

  for (const quiz of quizData) {
    await QuizList.create({
      ...quiz,
    });
  }

  for (const question of questionData) {
    await Question.create({
      ...question,
    });
  }

  for (const score of scoreData) {
    await Score.create({
      ...score,
    });
  }

  process.exit(0);
};

seedDatabase();