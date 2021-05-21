const mongoose = require('mongoose');

module.exports = async function() {
  await mongoose.connect('mongodb+srv://dbuser:XKKqs32MLP5Xw*X@cluster0.d0fpc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'));
}


