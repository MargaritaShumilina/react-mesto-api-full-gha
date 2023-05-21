const jwt = require('jsonwebtoken');

const SECRET_KEY = 'SECRET';

const {
  UNAUTHORIZED,
} = require('../errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UNAUTHORIZED('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UNAUTHORIZED('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
