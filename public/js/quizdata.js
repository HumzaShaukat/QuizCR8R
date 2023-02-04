const delQuizBtn = document.querySelector('#delete-quiz-btn')
const updateQuizBtn = document.querySelector("#update-quiz-btn");
const quizId = document.querySelector("#quizdata-container").getAttribute("quiz-id");

const deleteQuiz = async function () {
    await fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
    }).then(async (response) => await response.json()).then(function async(data) {
        location.href = `/profile`
    });

};

delQuizBtn.addEventListener("click", deleteQuiz);

updateQuizBtn.addEventListener("click", function () {
  location.href = `/quizzes/update-quiz/${quizId}`;
});
