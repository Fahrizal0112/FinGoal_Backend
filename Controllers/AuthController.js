const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const CreateToken = (id) => {
    return jwt.sign({ id } , process.env.JWT_SECRET, {expiresIn:'1d'});
};

const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ where: { username }});
        if (user) {
            return res.status(400).json({message: 'Username Already Exists!'});
        }
        user = await User.findOne({ where: { email }});
        if (user) {
            return res.status(400).json({ message: 'Email Already Exists!'});
        }
        user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User Created Successfully '});
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

const Signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: {username} });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials!' });

        const isMatch = await user.matchpassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials!' });

        const token = CreateToken(user.id);

        res.cookie('authorization', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'fingoal',
            maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN),
        });
        res.json({ message: `Login Successful! Welcome ${username}`});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

module.exports = { Signup,Signin }