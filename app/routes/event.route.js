const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/auth.middleware');
const eventController = require('../controllers/event.controller');

router.post('/', isAuthenticated, eventController.addEvent);
router.get('/', eventController.findEvents);
router.get('/:id', isAuthenticated, eventController.findEventById);
router.put('/:id', isAuthenticated, eventController.updateEvent);
router.delete('/:id', isAuthenticated, eventController.deleteById);

module.exports = router;
