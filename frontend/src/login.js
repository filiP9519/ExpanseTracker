import response from "jsonwebtoken/lib/JsonWebTokenError.js";
const userError = document.querySelector('.user_error_message');
const passwordError = document.querySelector('.password_error_message');

document.getElementById('login_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userDataLogin = {
        username : document.getElementById('username_login').value,
        password : document.getElementById('password_login').value
    }

    userError.textContent = '';
    passwordError.textContent = '';

    try{
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userDataLogin}),
        });

        const data = await response.json();
        console.log(data);
        if(data.errors){
            userError.textContent = data.errors;
            passwordError.textContent = data.errors;
        }

    }
    catch (e){
        console.error(e);
    }
});