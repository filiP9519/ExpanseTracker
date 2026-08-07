//-------------------------- SIGN UP FORM --------------------------
document.getElementById('signup_form').addEventListener('submit', async (e) => {
  e.preventDefault(); //stops refresh of website

  const userData = {
    email: document.getElementById('email_signup').value,
    username: document.getElementById('username_signup').value,
    password: document.getElementById('password_signup').value,
  };

  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

      const data = await response.json();

    if (response.ok) {
      alert('Sign up successfully');
    } else {
      alert(
        'Sign up failed during registration: ' +
          (data.error || 'Unknown error'),
      );
    }
  } catch (error) {
    console.error('Error pri signUpe: ', error);
  }
});
//-------------------------- END OF SIGN UP FORM --------------------------

//-------------------------- LOGIN  --------------------------


//-------------------------- END OF LOGIN  --------------------------