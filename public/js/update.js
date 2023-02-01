// const quizID = document.querySelector('')
const checkAnswer = function() {
    let correctAnswer = document.querySelector('input[name="correct-answer"]:checked').value;
    switch (correctAnswer) {
        case 'choice1':
            document.querySelector("#choice1-input").setAttribute('checked', 'checked');
            break;
        case 'choice2':
            document.querySelector("#choice2-input").setAttribute('checked', 'checked');
            break;
        case 'choice3':
            document.querySelector("#choice3-input").setAttribute('checked', 'checked');
            break;
        case 'choice4':
            document.querySelector("#choice-input").setAttribute('checked', 'checked');
            break;
    };
};

const updateQuestion = async function (event) {
    event.preventDefault();
    checkAnswer();
    let postInfo = {
        question: document.querySelector("#question-input").value,
        choice1: document.querySelector("#choice1-input").value,
        choice2: document.querySelector("#choice2-input").value,
        choice3: document.querySelector("#choice3-input").value,
        choice4: document.querySelector("#choice4-input").value,
        answer: document.querySelector('input[name="correct-answer"]:checked').value,
        quiz_id: iD.getAttribute('quizId')
    }; console.log(postInfo);
    // await fetch(`/question/${questionID}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({

    //     })
    // })
}

document
    .querySelector('#update-question-btn')
    .addEventListener('click', function() {
        location.href="/update-question/:id"
    });



// async function updateQuestion(event) {
//     event.preventDefault();
//     var questionID = document.querySelector("#question-id").value
// }

// const postId = document.querySelector('input[name="post-id"]').value;

// const editFormHandler = async function (event) {
//     event.preventDefault();

//     const title = document.querySelector('input[name="post-title"]').value;
//     const body = document.querySelector('textarea[name="post-body"]').value;

//     await fetch(`/api/post/${postId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             title,
//             body
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     document.location.replace('/dashboard');
// };

// const deleteClickHandler = async function () {
//     await fetch(`/api/post/${postId}`, {
//         method: 'DELETE'
//     });

//     document.location.replace('/dashboard');
// };

// document
//     .querySelector('#edit-post-form')
//     .addEventListener('submit', editFormHandler);
// document
//     .querySelector('#delete-btn')
//     .addEventListener('click', deleteClickHandler);