const express = require('express');
const router = express.Router();

const institutionRoutes = require('./institution.route');
const residenceRoutes = require('./residence.route');
const userRoutes = require('./user.route');

router.use('/institutions', institutionRoutes);
router.use('/residences', residenceRoutes);
router.use('/users', userRoutes);

module.exports = router;
