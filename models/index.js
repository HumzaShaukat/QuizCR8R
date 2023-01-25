const User = require('./User');
const QuizList = require('./QuizList');
const Question = require('./Question');


User.hasMany(QuizList, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE'
});

QuizList.belongsTo(User, {
  foreignKey: 'user_id'
});

QuizList.hasMany(Question, {
  foreignKey: 'quiz_id',
  onDelete: 'CASCADE'
});

Question.belongsTo(QuizList, {
  foreignKey: 'quiz_id'
});

module.exports = { User, QuizList, Question };
