const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const bp = require("body-parser");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
mongoose.set('useFindAndModify', false);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

