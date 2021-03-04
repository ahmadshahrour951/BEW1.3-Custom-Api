if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
 
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const db = require('./config/database');

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(error => {
  console.error('Unable to connect to the database:', error);
})

const app = express();

app.use(bodyParser.json()); // application/json
app.use(cors('*'));

app.use('/', require('./routes'));

const PORT = process.env.PORT || 5000;

db.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error: ' + err));
