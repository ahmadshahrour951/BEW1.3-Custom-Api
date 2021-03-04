if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
 
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const db = require('./app/models');
const routes = require('./app/routes')

db.sequelize.authenticate()
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
app.use(cors('*'));

app.use('/', routes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: true })
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error: ' + err));
