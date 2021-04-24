const auth = require('../middleware/auth');
const {Songlist, validatesonglist, validate} = require('../models/songlist');
const {Song, validatesong} = require('../models/songs');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');



//ADD SONGLIST
router.post('/', auth, async (req, res) => {
  const { error } = validatesonglist(req.body); 
  if (error) return res.status(400).send(error.details[0].message);  
  let repeat = await Songlist.findOne({ name: req.body.name,uid: req.body.uid});
  if (repeat) return res.status(400).send('Songlist already registered.');
  let songlist = new Songlist({ name: req.body.name, uid: req.body.uid });
  songlist = await songlist.save();    
  res.json(songlist);
});

//Return ALL SONGLIST OF A USER
router.get('/:id', auth, async (req, res) => {
  validate(req, res);
    const songlist = await Songlist.find({uid: req.params.id})
    if (!songlist) return res.status(404).send('The songlist with the given UserID was not found.');
    var result =  _.map(songlist, i => _.pick(i, '_id', 'name', 'songs'));
    console.log(result); 
    res.send(result);
});

//DELETE SONGLIST
router.delete('/:id',auth, async (req, res) => {
  validate(req, res);
  const songlist = await Songlist.findByIdAndRemove(req.params.id);
  if (!songlist) return res.status(404).send('The songlist with the given ID was not found.');
  res.send(songlist);
});

//UPDATA SONGLIST NAME
router.put('/:id', auth,async (req, res) => {
  validate(req, res);

  const { error } = validatesonglist(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const songlist = await Songlist.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
    }, { new: true });
  if (!songlist) return res.status(404).send('The songlist with the given ID was not found.');  
  res.send(songlist);
});





module.exports = router;