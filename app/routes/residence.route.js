const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/auth.middleware');
const residenceController = require('../controllers/residence.controller');

// router.post('/', isAuthenticated, residenceController.addResidence);
router.post('/', residenceController.addResidence);
router.get('/', residenceController.findResidences);
router.get('/:id', residenceController.findResidenceById);
router.get('/:id/users', isAuthenticated, residenceController.findAllUsers);
router.put('/:id', isAuthenticated, residenceController.updateResidence);
router.delete('/:id', isAuthenticated, residenceController.deleteById);

module.exports = router;