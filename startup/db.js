const mongoose = require('mongoose');

module.exports = async function() {
  await mongoose.connect('mongodb+srv://user:tommy@cluster0.pu2qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'));
}


