const residenceDao = require('../dao/residence.dao');
var residenceController = {
  addResidence,
  findResidences,
  findAllUsers,
  findResidenceById,
  updateResidence,
  deleteById,
};

function addResidence(req, res) {
  let residence = req.body;
  residenceDao
    .create(residence)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findResidenceById(req, res) {
  residenceDao
    .findById(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  residenceDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Residence deleted successfully',
        residence: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateResidence(req, res) {
  residenceDao
    .updateResidence(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Residence updated successfully',
        residence: data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findResidences(req, res) {
  residenceDao
    .findAll()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findAllUsers(req, res) {
    residenceDao
      .findAllUsers()
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => {
        console.log(error);
      });
}

module.exports = residenceController;
