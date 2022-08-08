const { Router } = require('express');
const { signup, login } = require('../controllers/auth');
const { validateSignup } = require('../validations/auth');

const auth = Router();

auth.post('/signup', validateSignup, signup);
auth.post('/login', login);

module.exports = { auth };
