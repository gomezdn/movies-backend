const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function generateToken(payload) {
  return jwt.sign(
    {
      data: payload,
    },
    SECRET
  );
}

async function getTokenData(token) {
  let result;

  await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    } else {
      result = decoded.data.dataValues;
    }
  });
  return result;
}

module.exports = { generateToken, getTokenData };
