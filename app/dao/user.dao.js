const db = require('../models');
const Residence = db.residences;
const User = db.users;

var userDao = {
  findAll: findAll,
  findAllEventsAttending: findAllEventsAttending,
  findAllCreatorEvents: findAllCreatorEvents,
  // create: create,
  findById: findById,
  deleteById: deleteById,
  updateUser: updateUser,
};

function findAll() {
  return User.findAll();
}

function findAllEventsAttending(user_id) {
  return User.findByPk(user_id).then((user) => {
    return user.getEvents({
      through: 'user_event',
    });
  });
}

function findAllCreatorEvents(user_id) {
  return User.findByPk(user_id).then((user) => {
    return user.getEventsCreated();
  });
}

function findById(id) {
  return User.findByPk(id);
}

function deleteById(id) {
  return User.destroy({ where: { id: id } });
}

// function create(user) {
//   const newUser = new User({
//     name: user.name,
//     email: user.email,
//   });

//   let savedUser;

//   return newUser
//     .save()
//     .then((user_data) => {
//       savedUser = user_data;
//       return Residence.findByPk(user.residence_id);
//     })
//     .then((residence) => {
//       return residence.setUsers([savedUser]);
//     }).then(() => {
//       return savedUser
//     })
// }

function updateUser(user, id) {
  var updateUser = {
    email: user.email,
    password: user.password,
    name: user.name,
  };
  return User.update(updateUser, { where: { id: id } });
}
module.exports = userDao;
