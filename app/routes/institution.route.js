const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/auth.middleware')
const institutionController = require('../controllers/institution.controller');

// Uncomment this in production
// router.post('/', isAuthenticated, institutionController.addInstitution);
router.post('/', institutionController.addInstitution);
router.get('/', institutionController.findInstitutions);
router.get('/:id', institutionController.findInstitutionById);
router.get('/:id/residences', institutionController.findAllResidences);
router.put('/:id', isAuthenticated, institutionController.updateInstitution);
router.delete('/:id', isAuthenticated, institutionController.deleteById);

module.exports = router;