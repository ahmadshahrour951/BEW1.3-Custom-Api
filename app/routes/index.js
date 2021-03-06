const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const institutionRoutes = require('./institution.route');
const residenceRoutes = require('./residence.route');
const userRoutes = require('./user.route');
const eventRoutes = require('./event.route');

router.use('/auth', authRoutes);
router.use('/institutions', institutionRoutes);
router.use('/residences', residenceRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
