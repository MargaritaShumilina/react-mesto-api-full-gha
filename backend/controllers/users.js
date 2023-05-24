const User = require('../models/users');
const {
  PAGE_NOT_FOUND,
  BAD_REQUEST,
} = require('../errors');

const getFiltredUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new PAGE_NOT_FOUND('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BAD_REQUEST('Невалидный id'));
        return;
      }
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const userMe = (user, res, next) => {
  if (user) {
    return res.send(user);
  }
  throw next(new PAGE_NOT_FOUND('NotFound'));
};

const updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new PAGE_NOT_FOUND('Пользователь не найден'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BAD_REQUEST('Ошибка данных'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user.id;

  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      userMe(user, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BAD_REQUEST('Ошибка данных'));
      }
      return next(err);
    });
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return next(new PAGE_NOT_FOUND('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  getFiltredUser,
  getUsers,
  updateUserData,
  updateUserAvatar,
  getMyProfile,
};
