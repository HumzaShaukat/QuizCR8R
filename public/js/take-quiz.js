const questionBox = document.querySelector("#quiz-question-box");
const questionText = document.querySelector("#quiz-question");
const choiceList = document.querySelector("#answer-choice-list");
// const choice1El = document.querySelector("#choice1")
// const choice2El = document.querySelector("#choice2")
// const choice3El = document.querySelector("#choice3")
// const choice4El = document.querySelector("#choice4")
const choice1Text = document.querySelector("#choice1-text");
const choice2Text = document.querySelector("#choice2-text");
const choice3Text = document.querySelector("#choice3-text");
const choice4Text = document.querySelector("#choice4-text");
const takeQuizContainer = document.querySelector("#takequiz-container");
const quizID = takeQuizContainer.getAttribute("quiz-id");
let questions = [];
let numQuest = 0;
let userCorrect = 0;
let userScore = 0;
const endQuizBox = document.querySelector("#end-quiz-box");
const timerText = document.querySelector("#timer-text");
const scoreText = document.querySelector("#score-text");
const messageText = document.querySelector("#message-text");
let quizTime = 0;
const finalScore = document.querySelector("#final-score");

const getQuiz = async () => {
  takeQuizContainer.classList.remove("hidden");
  endQuizBox.classList.add("hidden");
  scoreText.textContent = "0 %";
  messageText.textContent = "Good Luck!";
  clearMessage;
  await fetch(`/api/take-quiz/${quizID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      questions = data.quiz.questions;
      numQuest = questions.length;
      console.log(data.quiz);
      quizTime = parseInt(data.quiz.time);
    })
    .catch((err) => {
      console.error(err);
    });
  startTimer();
  renderQuestion();
};

const clearMessage = setTimeout(function () {
  messageText.textContent = "";
}, 2000);

function startTimer() {
  timer = setInterval(function () {
    let minutes = Math.floor(quizTime / 60);
    let seconds = quizTime % 60;
    if (seconds < 10) {
      timerText.textContent = `${minutes}:0${seconds}`;
    } else {
      timerText.textContent = `${minutes}:${seconds}`;
    }
    quizTime--;
    if (quizTime < 1) {
      clearInterval(timer);
      timerText.textContent = "00:00";
      endQuiz();
      return;
    }
  }, 1000);
}

const renderQuestion = async () => {
  const correctAnswer = questions[0].answer;
  const answerEl = document.querySelector(`#${correctAnswer}-text`);
  questionText.textContent = questions[0].question;
  choice1Text.textContent = questions[0].choice1;
  choice2Text.textContent = questions[0].choice2;
  choice3Text.textContent = questions[0].choice3;
  choice4Text.textContent = questions[0].choice4;
  answerEl.setAttribute("correct-answer", true);
};

const saveScore = async () => {
  await fetch("/api/score/", {
    method: "POST",
    body: JSON.stringify({ quiz_id: quizID, score: userScore }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json);
};

const endQuiz = async () => {
  finalScore.textContent = userScore;
  quizTime = 0;
  saveScore();
  takeQuizContainer.classList.add("hidden");
  endQuizBox.classList.remove("hidden");
};

choiceList.addEventListener("click", async (event) => {
  console.log("answer selected");
  const element = event.target;
  let choiceCorrect = element.getAttribute("correct-answer");
  if (element.matches("span")) {
    console.log(element);
    //   let choiceKey = element.getAttribute('data-key');
    console.log(choiceCorrect);
    if (choiceCorrect === "true") {
      userCorrect = userCorrect + 1;
      userScore = Math.round((userCorrect / numQuest) * 100);
      console.log(`userCorrect\n${userCorrect}`);
      scoreText.textContent = `${userScore} %`;
      messageText.textContent = "CORRECT!";
      clearMessage;
    } else {
      messageText.textContent = "wrong!";
      clearMessage;
    }
    element.setAttribute("correct-answer", "false");

    if (questions.length > 1) {
      questions.shift();
      renderQuestion();
    } else {
      endQuiz();
    }
  }
});

getQuiz();
