const path = require('path');
const User = require('../models/user');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: '', username: ''};

    if (err.code === '23505'){
        if (err.constraint && err.constraint.includes('email')){
            errors.email = 'That email is already registered';

        }
    }  return errors;//console.log(err.message, err.code);
}
module.exports.signup_get = (req, res) => {
   // res.render('signup');
    res.sendFile(path.resolve(__dirname,'../frontend/register.html'))
}

module.exports.login_get = (req, res) => {
    res.sendFile(path.resolve(__dirname,'../frontend/login.html'))
}

module.exports.signup_post = async (req, res) => {
    const {email, password, username} = req.body;
    if (!password || password.trim() === '') {
        return res.status(400).json({ error: 'Password cannot be empty!' });
    }
    if(password.length < 8){
        return res.status(400).json({ error: 'Password cannot be shorter than 8 characters.'})
    }
    if (!username || username.trim() === '') {
        return res.status(400).json({ error: 'Username cannot be empty!' });
    }
    try {
        const user = await User.create(email, password, username);
        res.status(201).json({user})
    } catch (error) {
        const errors = handleErrors(error);

        res.status(400).json({error: errors});

    }
}

module.exports.login_post = async (req, res) => {
    const{username, password} = req.body;
    try{
        const user = await User.login(username, password);
        res.status(201).json({user})
    } catch (error) {
        console.log(error);
    }
}