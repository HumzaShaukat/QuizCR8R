const createBtn = document.querySelector("#create-btn");
const updateUserBtn = document.querySelector("#update-user-btn");


createBtn.addEventListener("click", function () {
  location.href = "/new-quiz";
});

updateUserBtn.addEventListener("click", function () {
  location.href = "/update-user";
});
