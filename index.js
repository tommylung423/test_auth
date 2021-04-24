const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors()) 
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));