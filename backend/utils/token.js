require('dotenv').config();

const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

function generateToken(id) {
  return jwt.sign(
    { id },
    NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
    {
      expiresIn: '7d',
    },
  );
}

module.exports = generateToken;
