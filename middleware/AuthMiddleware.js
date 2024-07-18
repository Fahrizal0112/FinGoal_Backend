const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        try {
            token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.User = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] }});
            next();
        } catch (error) {
            res.status(401).json({message: 'Not Authorized, Token Invalid'});
        }
    }
    if (!token) {
        res.status(401).json({message: 'Not Authorized, No Token'});
    }
};

module.exports = { protect };