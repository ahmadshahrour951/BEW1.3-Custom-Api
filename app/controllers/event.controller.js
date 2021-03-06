const eventDao = require('../dao/event.dao');
var eventController = {
  addEvent,
  findEvents,
  findEventById,
  updateEvent,
  deleteById,
};

function addEvent(req, res) {
  let event = req.body;
  eventDao
    .create(event)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findEventById(req, res) {
  eventDao
    .findById(req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  eventDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Event deleted successfully',
        event: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateEvent(req, res) {
  eventDao
    .updateEvent(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Event updated successfully',
        event: data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findEvents(req, res) {
  eventDao
    .findAll()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = eventController;
