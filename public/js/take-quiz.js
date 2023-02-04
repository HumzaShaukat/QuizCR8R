const questionBox = document.querySelector('#quiz-question-box')
const questionText = document.querySelector("#quiz-question");
const choiceList = document.querySelector("#answer-choice-list")
const choice1El = document.querySelector("#choice1")
const choice2El = document.querySelector("#choice2")
const choice3El = document.querySelector("#choice3")
const choice4El = document.querySelector("#choice4")
const choice1Text = document.querySelector("#choice1-text")
const choice2Text = document.querySelector("#choice2-text")
const choice3Text = document.querySelector("#choice3-text")
const choice4Text = document.querySelector("#choice4-text")
const quizID = document.querySelector('#takequiz-container').getAttribute('quiz-id')
let questions = [];
let userCorrect = 0

const getQuiz = async () => {
    await fetch(`/api/take-quiz/${quizID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            questions = data.quiz.questions
            console.log(data.quiz.questions)
            console.log(data.quiz.questions.length)
            console.log(data.quiz.questions[0].answer)
            console.log(questions)
        })
        .catch((err) => {
            console.error(err)
        })
renderQuestion()
};

const renderQuestion = async () => {
    const correctAnswer = questions[0].answer
    const answerEl = document.querySelector(`#${correctAnswer}`)
    questionText.textContent = questions[0].question
    choice1Text.textContent = questions[0].choice1
    choice2Text.textContent = questions[0].choice2
    choice3Text.textContent = questions[0].choice3
    choice4Text.textContent = questions[0].choice4
    answerEl.setAttribute('correct-answer', true)
}

// const selectAnswer = async () => {

// }

choiceList.addEventListener('click', function async(event) {
    console.log('answer selected')
    const element = event.target;
    if (element.matches('li')) {
        console.log(element)
        let choiceCorrect = element.getAttribute('correct-answer');
        //   let choiceKey = element.getAttribute('data-key');
        console.log(choiceCorrect)
        if (choiceCorrect) {
            userCorrect = userCorrect + 1;
            console.log(userCorrect)
            // userScore = Math.round(100 * userCorrect / totalQuestions);
            // console.log(userScore)
            // scoreText.textContent = userScore;
            // console.log(currentQuiz)
            // currentMessage.innerHTML = ''
            // currentMessage.textContent = `CORRECT ANSWER!`;
            // setTimeout(function () {
            //   currentMessage.innerHTML = '';
            // }, 3000);
        } else {
            // currentMessage.innerHTML = ''
            // currentMessage.textContent = `INCORRECT ANSWER`;
            // setTimeout(function () {
            //   currentMessage.innerHTML = '';
            // }, 3000);
        }
        if (questions.length > 0) {
            renderQuestion()
            // hideAllSections();
            // endQuizSection.classList.remove('hidden');
            // currentMessage.innerHTML = ''
            // currentMessage.textContent = `${userName}, YOU HAVE COMPLETED THE QUIZ!`;
            // setTimeout(function () {
            //   currentMessage.innerHTML = '';
            // }, 3000);
            // questions.shift();
            // endQuiz();
        } else {
            endQuiz();
        }
    }
});


getQuiz();