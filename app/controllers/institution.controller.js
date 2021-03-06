const institutionDao = require('../dao/institution.dao');
var institutionController = {
  addInstitution,
  findInstitutions,
  findAllResidences,
  findInstitutionById,
  updateInstitution,
  deleteById,
};

function addInstitution(req, res) {
  let institution = req.body;
  institutionDao
    .create(institution)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findInstitutionById(req, res) {
  institutionDao
    .findById(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  institutionDao
    .deleteById(req.params.id)
    .then((data) => {
      return res.status(200).json({
        message: 'Institution deleted successfully',
        institution: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateInstitution(req, res) {
  institutionDao
    .updateInstitution(req.body, req.params.id)
    .then((data) => {
      return res.status(200).json({
        message: 'Institution updated successfully',
        institution: data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findInstitutions(req, res) {
  institutionDao
    .findAll()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findAllResidences(req, res) {
  institutionDao
    .findAllResidences(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = institutionController;
