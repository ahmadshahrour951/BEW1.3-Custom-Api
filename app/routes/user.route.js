const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

// router.post('/', userController.addUser);
router.get('/', isAuthenticated, userController.findUsers);
router.get('/:id', isAuthenticated, userController.findUserById);
router.get(
  '/:id/events',
  isAuthenticated,
  userController.findAllEventsAttending
);
router.get(
  '/:id/events-created',
  isAuthenticated,
  userController.findAllCreatorEvents
);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteById);

module.exports = router;
