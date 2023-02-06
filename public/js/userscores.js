
const scoreList = document.querySelector('#quiz-scores-list');

scoreList.addEventListener('click', async (event) => {
  const element = event.target;
  if (element.matches('li')) {
    const quizID = element.getAttribute('quiz-id');
    location.href = `/quizzes/${quizID}`;
  }
});
