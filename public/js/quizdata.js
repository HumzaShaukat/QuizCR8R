const scoresBtn = document.querySelector('#quiz-scores-btn');
const delQuizBtn = document.querySelector('#delete-quiz-btn');
const updateQuizBtn = document.querySelector('#update-quiz-btn');
const addQuestionBtn = document.querySelector('#add-question-btn');
const takeQuizBtn = document.querySelector('#take-quiz-btn');
const quizId = document.querySelector('#quizdata-container').getAttribute('quiz-id');

const deleteQuiz = async function () {
  await fetch(`/api/quizzes/${quizId}`, {
    method: 'DELETE'
  }).then(async (response) => await response.json()).then(function async(data) {
    location.href = '/profile';
  });
};

scoresBtn.addEventListener('click', function () {
  location.href = `/quizzes/scores/${quizId}`;
});

delQuizBtn.addEventListener('click', deleteQuiz);

updateQuizBtn.addEventListener('click', function () {
  location.href = `/quizzes/update-quiz/${quizId}`;
});

addQuestionBtn.addEventListener('click', function () {
  location.href = `/new-quiz/new-question/${quizId}`;
});

takeQuizBtn.addEventListener('click', function () {
  location.href = `/take-quiz/${quizId}`;
});
