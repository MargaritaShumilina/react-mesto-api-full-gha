require('dotenv').config();

const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const { UNAUTHORIZED } = require('../errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UNAUTHORIZED('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
    );
  } catch (err) {
    return next(new UNAUTHORIZED('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
