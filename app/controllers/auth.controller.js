const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authDao = require('../dao/auth.dao');
const authController = {
  signup,
  login,
};

function signup(req, res, next) {
  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPw) => {
      return authDao.createUser({
        email: req.body.email,
        password: hashedPw,
        name: req.body.name,
        residence_id: req.body.residence_id,
      });
    })
    .then((result) => {
      const token = jwt.sign(
        {
          userId: result.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        message: 'User successfully created',
        token: token,
      });
    })
    .catch((err) => {
      console.log(err)
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

function login(req, res, next) {
  let loadedUser;

  authDao
    .checkUser(req.body.email)
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      console.log(user.toJSON());
      loadedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          userId: loadedUser.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Successfully Logged in!',
        token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

module.exports = authController;
