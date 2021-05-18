const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');

app.use(cors()) 
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
mongoose.set('useFindAndModify', false);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;