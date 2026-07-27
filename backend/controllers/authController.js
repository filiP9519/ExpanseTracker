const path = require('path');

module.exports.signup_get = (req, res) => {
   // res.render('signup');
    res.sendFile(path.join(__dirname,'../frontend/register.html'))
}

module.exports.login_get = (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/login.html'))
}

module.exports.signup_post = (req, res) => {
    res.send('new signup');
}

module.exports.login_post = (req, res) => {
    res.send('user login');
}