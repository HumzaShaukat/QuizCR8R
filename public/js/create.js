async function postQuiz(event) {
    event.preventDefault();
    const quizTitle = await {
        user_id: 1,
        quiz_title:  document.querySelector("#quiz-title-input").value
    }
  fetch("/api/quizzes", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizTitle),
  }).then(async (response)=> await response.json())
  .then(async function (data) {
    location.href = `/new-quiz/${data}/new-question`;
  });
}

async function getQuizID(title) {
    var title = await QuizList.findOne({
        where: {
            quiz_title: title
    }})
    return title.id;
}

async function postQuestion(event) {
    event.preventDefault();
    fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify({
        question: document.querySelector("#question-input").value.trim(),
        choice1: document.querySelector("#choice1-input").value.trim(),
        choice2: document.querySelector("#choice2-input").value.trim(),
        choice3: document.querySelector("#choice3-input").value.trim(),
        choice4: document.querySelector("#choice4-input").value.trim(),
        answer: document
          .querySelector('input[name="radio-choices"]:checked')
          .val(),
        quiz_id: req.params.id
      }),
    }).then(async function (data) {
      console.log(data);
    });
  }

document.querySelector("#save-quiz-btn").addEventListener("click", postQuiz);
document.querySelector(".add-question-btn").addEventListener("click", postQuestion)
