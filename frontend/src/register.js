const signUpForm = document.getElementById('signup_form');

if(signUpForm){

  const emailError = document.querySelector('.email_error_message');
  const signupUsernameError = document.querySelector('.password_error_message');
  const signupPasswordError = document.querySelector('.username_error_message');

  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
      email: document.getElementById('email_signup').value,
      username: document.getElementById('username_signup').value,
      password: document.getElementById('password_signup').value,
    };

    emailError.textContent = '';
    signupUsernameError.textContent = '';
    signupPasswordError.textContent = '';

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          emailError.textContent = data.error.email || '';
          signupUsernameError.textContent = data.error.username || '';
          signupPasswordError.textContent = data.error.password || '';
        }
      } else {
        alert('Sign up successful');
        console.log('Created data: ', data.user.user_id);
      }
    } catch (error) {
      console.error('Error during signUp: ', error);
    }
  });
}
