const express = require('express');
const { Signup, Signin } = require('../Controllers/AuthController');

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);

module.exports = router;