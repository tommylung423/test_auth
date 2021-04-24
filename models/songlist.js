const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const songlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  songs: [{type: mongoose.Schema.Types.ObjectId, ref:"Song"}]
});


const Songlist = mongoose.model('Songlist', songlistSchema);

function validatesonglist(songlist) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    uid: Joi.objectId().required()
  });  

  return schema.validate(songlist);
}


function validate(req,res) {
  const validate = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validate) return res.status(404).send('The songlist with the given ID was not found.');  
}
exports.Songlist = Songlist; 
exports.validatesonglist = validatesonglist;
exports.validate = validate;