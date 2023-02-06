const createBtn = document.querySelector('#create-btn');
const updateUserBtn = document.querySelector('#update-user-btn');
const userScoresBtn = document.querySelector('#user-scores-btn');

userScoresBtn.addEventListener('click', function () {
  location.href = '/profile/scores';
});

createBtn.addEventListener('click', function () {
  location.href = '/new-quiz';
});

updateUserBtn.addEventListener('click', function () {
  location.href = '/update-user';
});
