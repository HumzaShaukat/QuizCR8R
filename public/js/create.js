var quizID;

function nextQuestion(){
    document.querySelector("#question-input").value ='';
    document.querySelector("#choice1-input").value ='';
    document.querySelector("#choice2-input").value='';
    document.querySelector("#choice3-input").value='';
    document.querySelector("#choice4-input").value='';
    location.reload();
}

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
    quizID = data;
    location.href = `/new-quiz/new-question/${data}`;
  });
}

async function postQuestion(event) {
    event.preventDefault();
    var iD = document.querySelector('#create-box');
    let postInfo = {
        question: document.querySelector("#question-input").value,
        choice1: document.querySelector("#choice1-input").value,
        choice2: document.querySelector("#choice2-input").value,
        choice3: document.querySelector("#choice3-input").value,
        choice4: document.querySelector("#choice4-input").value,
        answer: document.querySelector('input[name="correct-answer"]:checked').value,
        quiz_id: iD.getAttribute('quizId') 
        };
    fetch("/api/questions", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postInfo),
    }).then(function (data) {
        nextQuestion();
    });
    }

    if (document.querySelector("#save-quiz-btn")) {
        document.querySelector("#save-quiz-btn").addEventListener("click", postQuiz);
    }

    document.querySelector(".add-question-btn").addEventListener("click", postQuestion);

    if (document.querySelector(".finish-quiz-btn")) {
        document.querySelector(".finish-quiz-btn").addEventListener("click", function() {
            location.href = "/profile"
        })
    }

    