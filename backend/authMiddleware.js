require('dotenv').config();
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {})
    } else {
        res.redirect('/api/login');
    }

    next();
}