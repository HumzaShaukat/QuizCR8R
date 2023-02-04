const updateUserFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const userId = document.querySelector('#update-user-box').getAttribute('user-id');
  const username = document.querySelector('#username-update').value.trim();
  const email = document.querySelector('#email-update').value.trim();
  const password = document.querySelector('#new-password-update').value.trim();
  const oldPassword = document.querySelector('#old-password-update').value.trim();

  if (username && email && password && oldPassword) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/user/update-user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, username, email, password, oldPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#update-user-form')
  .addEventListener('submit', updateUserFormHandler);