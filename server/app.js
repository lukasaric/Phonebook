'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./database');
const apiRouter = require('./routes/index');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  })
  .catch(() => console.log(`Can't connect to database`));
