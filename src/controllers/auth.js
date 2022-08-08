const { User } = require('../models/User');
const {
  encryptPassword,
  comparePasswords,
} = require('../utils/passwordEncription');

async function signup(req, res) {
  try {
    const existingUser = await User.findByPk(req.body.email);

    if (existingUser == null) {
      await User.create({
        ...req.body,
        password: await encryptPassword(req.body.password),
      });
      res.status(201).json({ message: 'User created' });
    } else {
      res.status(409).json({ message: 'Email already registered' });
    }
  } catch (e) {
    res.status(500).json({ mesage: e.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findByPk(email);
    const validPassword = await comparePasswords(
      password,
      existingUser?.password || ''
    );

    if (existingUser == null || !validPassword) {
      res.status(401).json({ message: 'Email or password incorrect' });
    } else if (!existingUser.activated) {
      res.status(403).json({
        message: 'You need to activate your account first; check your inbox',
      });
    } else {
      res.status(200).json({ message: 'Logged in succesfully' });
    }
  } catch (e) {
    res.status(500).json({ mesage: e.message });
  }
}

module.exports = { signup, login };
