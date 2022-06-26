const { endsWith } = require('lodash');
const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging');
require('./startup/routers')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

process.on('uncaughtException', (ex)=> {
  winston.error(ex.message, ex);
  process.exit(1);
});

const port = 5000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));