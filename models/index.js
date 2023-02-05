const User = require('./User');
const QuizList = require('./QuizList.js');
const Question = require('./Question');
const Score = require('./Score')

User.hasMany(QuizList, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Score, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

QuizList.belongsTo(User, {
  foreignKey: 'user_id'
});

QuizList.hasMany(Question, {
  foreignKey: 'quiz_id',
  onDelete: 'CASCADE'
});

QuizList.hasMany(Score, {
  foreignKey: 'quiz_id',
  onDelete: 'CASCADE'
});

Question.belongsTo(QuizList, {
  foreignKey: 'quiz_id'
});

Score.belongsTo(User, {
  foreignKey: 'user_id'
})

Score.belongsTo(QuizList, {
  foreignKey: 'quiz_id'
})

module.exports = { User, QuizList, Question, Score };
