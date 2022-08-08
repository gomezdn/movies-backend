const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePasswords(plainPassword, encryptedPassword) {
  return await bcrypt.compare(plainPassword, encryptedPassword);
}

module.exports = { encryptPassword, comparePasswords };
