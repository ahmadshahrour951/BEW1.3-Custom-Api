const db = require('../models');
const User = db.users;
const Event = db.events;

var eventDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateEvent: updateEvent,
};

function findAll() {
  return Event.findAll();
}

function findById(id) {
  return Event.findByPk(id);
}

function deleteById(id) {
  return Event.destroy({ where: { id: id } });
}

function create(event) {
  var newEvent = new Event({
    name: event.name,
    time: event.time,
    description: event.description
  });

  let savedEvent;
  return newEvent.save().then(event_data => {
     savedEvent = event_data
     return User.findByPk(event.created_by)
  }).then(user => {
    return user.setEventsCreated([savedEvent]);
  })
}

function updateEvent(event, id) {
  var updateEvent = {
    email: event.email,
    password: event.password,
    name: event.name,
  };
  return Event.update(updateEvent, { where: { id: id } });
}
module.exports = eventDao;
