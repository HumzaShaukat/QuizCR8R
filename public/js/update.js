// const quizID = document.querySelector('')
const checkAnswer = function () {
    let correctAnswer = document.querySelector(".question-form").getAttribute("correctAnswer");
    console.log(correctAnswer);
    switch (correctAnswer) {
        case 'choice1':
            document.querySelector("#choice1-radio").checked = "checked";
            break;
        case 'choice2':
            document.querySelector("#choice2-radio").checked = "checked";
            break;
        case 'choice3':
            document.querySelector("#choice3-radio").checked = "checked";
            break;
        case 'choice4':
            document.querySelector("#choice4-radio").checked = "checked";
            break;
    };
};

const updateQuestion = async function (event) {
    event.preventDefault();
    const questId = document.querySelector(".question-form").getAttribute("questionId");
    let iD = document.querySelector(".question-form")
    let putRoute = `/api/questions/update-question/${questId}`
    let postInfo = {
        question: document.querySelector("#question-input").value,
        choice1: document.querySelector("#choice1-input").value,
        choice2: document.querySelector("#choice2-input").value,
        choice3: document.querySelector("#choice3-input").value,
        choice4: document.querySelector("#choice4-input").value,
        answer: document.querySelector('input[name="correct-answer"]:checked').value,
        quiz_id: iD.getAttribute('quizId')
    }; console.log(postInfo);
    await fetch(putRoute, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postInfo)
    }).then(async (response) => await response.json()).then(function async(data) {
        location.href = `/question/${questId}`
    })
};
// question.handlebars
if (document.querySelector("#question-box")) {
    document
        .querySelector('#update-question-btn')
        .addEventListener('click', function () {
            const questId = document.querySelector("#question-box").getAttribute("questionId")
            location.href = `/question/update-question/${questId}`
        });
};

// update-question.handlebars
if (document.querySelector(".update-qstn-btn")) {
    checkAnswer();
    document
        .querySelector('.update-qstn-btn')
        .addEventListener('click', updateQuestion);
};

const deleteQuestion = async function (event) {
    event.preventDefault();
    const questId = document.querySelector("#question-box").getAttribute("questionId");
    await fetch(`/api/questions/${questId}`, {
        method: 'DELETE'
    }).then(async (response) => await response.json()).then(function async(data) {
        location.href = `/question`
    });

};

// delete 
if (document.querySelector('#delete-question-btn')) {
    document
        .querySelector('#delete-question-btn')
        .addEventListener('click', deleteQuestion);
};

const updateQuiz = async function (event) {
    event.preventDefault();
    const quizId = document.querySelector(".quiz-title-form").getAttribute("quiz-id");
    const quizTitle = document.querySelector('#quiz-title-input').value
    let putRoute = `/api/quizzes/${quizId}`
    let quizInfo = {
        id: quizId,
        quiz_title: quizTitle
    };
    console.log(quizInfo);
    await fetch(putRoute, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizInfo)
    }).then(async (response) => await response.json()).then(function async(data) {
        location.href = `/quizzes/${quizId}`
    })
};


if (document.querySelector('#update-quiz-btn')) {
    document
        .querySelector('#update-quiz-btn')
        .addEventListener('click', updateQuiz);
};