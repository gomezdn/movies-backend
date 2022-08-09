const { Router } = require('express');
const { signup, login, confirmAccount } = require('../controllers/auth');
const { validateSignup } = require('../validations/auth');

const auth = Router();

auth.post('/signup', validateSignup, signup);
auth.get('/confirmAccount/:token', confirmAccount);
auth.post('/login', login);

module.exports = { auth };
