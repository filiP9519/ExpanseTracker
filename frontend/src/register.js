//-------------------------- SIGN UP FORM --------------------------
const emailError = document.querySelector('.email_error_message');
const passwordError = document.querySelector('.password_error_message');
const usernameError = document.querySelector('.username_error_message');

document.getElementById('signup_form').addEventListener('submit', async (e) => {
  e.preventDefault(); //stops refresh of website

  const userData = {
    email: document.getElementById('email_signup').value,
    username: document.getElementById('username_signup').value,
    password: document.getElementById('password_signup').value,
  };

  emailError.textContent = '';
  usernameError.textContent = '';
  passwordError.textContent = '';


  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      if(data.error){
        emailError.textContent = data.error.email || '';
        usernameError.textContent = data.error.username || '';
        passwordError.textContent = data.error.password || '';
      }
    } else {
      alert('Sign up successful');
      console.log('Created data: ', data.user.user_id);
    }
  }
  catch (error) {
    console.error('Error during signUp: ', error);
  }
});
