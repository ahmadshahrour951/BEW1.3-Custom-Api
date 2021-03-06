const db = require('../models');
const Institution = db.institutions;

var institutionDao = {
  findAll: findAll,
  findAllResidences: findAllResidences,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateInstitution: updateInstitution,
};

function findAll() {
  return Institution.findAll();
}

function findAllResidences(institution_id) {
  return Institution.findByPk(institution_id).then((institution) => {
    return institution.getResidences();
  });
}

function findById(id) {
  return Institution.findByPk(id);
}

function deleteById(id) {
  return Institution.destroy({ where: { id: id } });
}

function create(institution) {
  var newInstitution = new Institution(institution);
  return newInstitution.save();
}

function updateInstitution(institution, id) {
  var updateInstitution = {
    name: institution.name,
  };
  return Institution.update(updateInstitution, { where: { id: id } });
}
module.exports = institutionDao;
