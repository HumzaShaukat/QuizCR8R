async function deleteQuiz(event) {
  let target = event.target;
  const ID = document
    .querySelector("#quizdata-container")
    .getAttribute("quizID");
  await fetch(`/api/quizzes/${ID}`, {
    method: "DELETE",
  })
    .then(async (response) => await response.json())
    .then((data) => {
      location.href = "/quizzes";
    });
}

document
  .querySelector("#delete-quiz-btn")
  .addEventListener("click", deleteQuiz(event));
