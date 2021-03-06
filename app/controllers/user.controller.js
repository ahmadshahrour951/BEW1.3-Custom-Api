const userDao = require('../dao/user.dao');
var userController = {
  addUser,
  findUsers,
  findAllEventsAttending,
  findAllCreatorEvents,
  findUserById,
  updateUser,
  deleteById,
};

function addUser(req, res) {
  let user = req.body;
  userDao
    .create(user)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findUserById(req, res) {
  userDao
    .findById(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  userDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'User deleted successfully',
        user: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUser(req, res) {
  userDao
    .updateUser(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'User updated successfully',
        user: data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findUsers(req, res) {
  userDao
    .findAll()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findAllEventsAttending(req, res) {
  userDao
    .findAllEventsAttending(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findAllCreatorEvents(req, res) {
  userDao
    .findAllCreatorEvents(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = userController;
