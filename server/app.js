'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./database');
const ContactRoutes = require('./routes/ContactRoutes');
const app = express();

const port = process.env.PORT;

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/contacts', ContactRoutes);

sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  });
