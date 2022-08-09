const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function generateToken(payload, duration) {
  return jwt.sign(
    {
      data: payload,
    },
    SECRET,
    { expiresIn: duration || '24h' }
  );
}

async function getTokenData(token) {
  let result;

  await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    } else {
      result = decoded.data;
    }
  });

  return result;
}

module.exports = { generateToken, getTokenData };
