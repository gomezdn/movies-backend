const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  greetingTimeout: 60000,
  auth: {
    user: process.env.NODEMAILER_REMITENT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

function sendEmail(address, body, subject) {
  transporter.sendMail({
    from: process.env.NODEMAILER_REMITENT,
    to: address,
    subject,
    html: body,
  });
}

module.exports = { sendEmail };
