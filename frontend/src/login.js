require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const loginForm = document.getElementById('login_form');
console.log(process.env.JWT_SECRET);
if (loginForm) {
  const userError = document.querySelector('.username_error_message');
  const loginPasswordError = document.querySelector('.password_error_message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userDataLogin = {
      username: document.getElementById('username_login').value,
      password: document.getElementById('password_login').value,
    };
    userError.textContent = '';
    loginPasswordError.textContent = '';

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDataLogin),
      });

      const data = await response.json();
      console.log(data);

      if (data.error) {
        userError.textContent = data.error.username || '';
        loginPasswordError.textContent = data.error.password || '';
      }

      if (response.ok) {
        console.log('Login úspešný!');
         location.assign('/');
      }
    } catch (e) {
      console.error('Error during login: ', e);
    }
  });
}
