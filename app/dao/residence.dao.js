const db = require('../models');
const Institution = db.institutions;
const Residence = db.residences;

var residenceDao = {
  findAll: findAll,
  findAllUsers: findAllUsers,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateResidence: updateResidence,
};

function findAll() {
  return Residence.findAll();
}

function findAllUsers(residence_id) {
  return Residence.findByPk(residence_id).then((residence) => {
    return residence.getUsers();
  });
}

function findById(id) {
  return Residence.findByPk(id);
}

function deleteById(id) {
  return Residence.destroy({ where: { id: id } });
}

function create(residence) {
  var newResidence = new Residence({
    name: residence.name,
    max_capacity: residence.max_capacity
  });

  let savedResidence;

  return newResidence.save()
  .then((residence_data) => {
    savedResidence = residence_data;
    return Institution.findByPk(residence.institution_id);
  })
  .then(institution => {
    return institution.setResidences([savedResidence]);
  }).then(() => {
    return savedResidence
  })
}

function updateResidence(residence, id) {
  var updateResidence = {
    name: residence.name,
    max_capacity: residence.max_capacity,
  };
  return Residence.update(updateResidence, { where: { id: id } });
}
module.exports = residenceDao;
