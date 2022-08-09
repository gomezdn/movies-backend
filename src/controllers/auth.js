const { User } = require('../models/User');
const {
  encryptPassword,
  comparePasswords,
} = require('../utils/passwordEncription');
const { sendEmail } = require('../utils/emailService');
const { generateToken, getTokenData } = require('../config/jwt');

function sendConfirmationEmail({ id, email }) {
  const emailToken = generateToken({ id }, '1h');
  const url = `${process.env.API_BASE_URL}${process.env.API_CONFIRM_ACCOUNT_ENDPOINT}/${emailToken}`;
  const emailBody = `
  <html>
    <section style="font-family: sans; display: flex; flex-direction: column;
                    row-gap: 3em; border: 4px solid brown; width: max-content;
                    padding: 3em; align-items: center">
      <h1 style="color: goldenrod">Thank you for using Movies Search App!</h1>
      <a style="color: black"target="_blank" href="${url}">Click here to verify your account</a>
      <p style="font-size: 0.7em">(If you didn't try to register please ignore this email)</p>
    </section>
  </html>
  `;

  sendEmail(email, emailBody, 'Account confirmation');
}

async function signup(req, res) {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser == null) {
      const newUser = await User.create({
        ...req.body,
        password: await encryptPassword(req.body.password),
      });

      sendConfirmationEmail(newUser);

      res.status(201).json({
        message:
          'User created! Check your inbox (or spam) to activate your account',
      });
    }
    if (!existingUser.activated) {
      sendConfirmationEmail(existingUser);
      res.status(200).json({
        message:
          'Confirmation email was sent again; please check your inbox or spam',
      });
    } else {
      res.status(409).json({ message: 'Email already in use' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function confirmAccount(req, res) {
  const { token } = req.params;

  try {
    const { id } = await getTokenData(token);
    const existingUser = await User.findByPk(id);

    if (existingUser != null) {
      await existingUser.update({ activated: true });
      res.status(200).json({ message: 'Account succesfully activated' });
    } else {
      res.status(404).json({ message: "Account doesn't exist" });
    }
  } catch (e) {
    res.json(e.message);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    const validPassword = await comparePasswords(
      password,
      existingUser?.password || ''
    );

    if (existingUser == null || !validPassword) {
      res.status(401).json({ message: 'Email or password incorrect' });
    } else if (!existingUser.activated) {
      res.status(403).json({
        message:
          'You need to activate your account first; check your inbox or spam',
      });
    } else {
      const token = generateToken(existingUser);
      res.status(200).json({ username: existingUser.username, token });
    }
  } catch (e) {
    res.status(500).json({ mesage: e.message });
  }
}

module.exports = { signup, confirmAccount, login };
