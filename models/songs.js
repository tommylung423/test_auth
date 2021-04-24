const Joi = require('joi');
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  urlid: {type: String,
    required: true
  },
  start:{Number},
  end:{Number},
  listid: {type: mongoose.Schema.Types.ObjectId, ref: 'Songlist'},


});
const Song = mongoose.model('Song', songSchema);

function validatesong(song) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    urlid: Joi.string().required(),
    start: Joi.number().required(),
    end: Joi.number().required(),
    listid: Joi.objectId().required()

  });  

  return schema.validate(song);
}

exports.Song = Song; 
exports.validatesong = validatesong;