if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const db = require('./app/models');
const routes = require('./app/routes');

db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const app = express();

app.use(bodyParser.json()); // application/json
app.use(logger('dev'));
app.use(cors('*'));
app.use('/api', routes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// const initDb =
//   process.env.NODE_ENV === 'development'
//     ? db.sequelize.sync({ force: true })
//     : db.sequelize.sync();

// initDb
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error: ' + err));

module.exports = app;
