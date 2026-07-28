const path = require('path');
const User = require('../models/user');

//handle errors
const handleErrors = (err) => {

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

    if (!email || email.trim() === ''){
        return res.status(400).json({error: 'Email is required!'});
    }
    if (!password || password.length < 6){
        return res.status(400).json({error: 'Password must be at least 6 characters long'});
    }
    if (!username || username.trim() === ''){
        return res.status(400).json({error: 'Username is required!'});
    }
    try {
        const user = await User.create(email, password, username);
        res.status(201).json({user})
    } catch (error) {
        handleErrors(error);
        /*
    if (error.code === '23505'){
        return res.status(400).json({error: 'Username already exists!'});
    }

    res.status(400).json({error: error.message});
    */
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