const db = require('../models');
const Residence = db.residences;
const User = db.users;

const authDao = {
  createUser,
  checkUser,
};

function createUser(data) {
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  let savedUser;

  return newUser
    .save()
    .then((savedUserData) => {
      // console.log(data)
      // console.log(savedUserData)
      savedUser = savedUserData;
      // console.log(data.residence_id)
      return Residence.findByPk(data.residence_id);
    })
    .then((residence) => {
      // console.log(savedUser);
      return residence.setUsers([savedUser]);
    })
    .then(() => {
      return savedUser;
    });
}

function checkUser(email) {
  return User.findOne({ where: { email: email } });
}

module.exports = authDao;
