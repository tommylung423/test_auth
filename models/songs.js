const Joi = require('joi');
const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150
  },
  url: {type: String,
    required: true
  },
  start:{type:Number},
  end:{type:Number},
  listid: {type: mongoose.Schema.Types.ObjectId, ref: 'Songlist'},
});



const Song = mongoose.model('Song', songSchema);

function validatesong(song) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(150).required(),
    url: Joi.string().required(),
    start: Joi.number().required(),
    end: Joi.number().required(),
    listid: Joi.objectId().required()

  });  

  return schema.validate(song);
}

exports.Song = Song; 
exports.validatesong = validatesong;