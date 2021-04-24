const auth = require('../middleware/auth');
const {Song, validatesong} = require('../models/songs');
const {Songlist, validate} = require('../models/songlist');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// ============songs====================//
//ADD SONGS 
router.post('/:id', auth,async (req, res) => {
  validate(req, res);
  const { error } = validatesong(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let song = new Song({ name: req.body.name, urlid: req.body.urlid, start: req.body.start, end: req.body.end, listid: req.body.listid });
  try{
      song = await song.save();    
      const songlist = await Songlist.findOne({_id: req.params.id})
      if (songlist) {
        songlist.songs.push(song);
        songlist.save();
        res.json({ message: 'songs created!' });
      } else {
        throw new Error; }
  }catch(error){
    res.status(500).send('The songlist with the given ID was not found.');
  };
});
//SORT SONGLIST ORDER 
router.put('/:id',auth, async (req, res) => {
    validate(req, res);
  const temp = ["6079e71415bdd4015d19c7e5", "6079e73115bdd4015d19c7e7"];
  const songlist = await Songlist.findByIdAndUpdate(req.params.id,
    { 
      songs: temp,
    }, { new: true });
  if (!songlist) return res.status(404).send('The songlist with the given ID was not found.');  
  res.send(songlist);
  });

//GET SONGS
router.get('/:id',auth, async (req, res) => {
    validate(req, res);
    try{
        const songs  = await Songlist.findOne({ _id: req.params.id });
        if(!songs){
            throw new Error;
        }
        await songs.populate('songs').execPopulate();
        res.send(songs.songs);
    }catch(err){
        res.status(404).send('The songlist with the given ID was not found.');
    }
  });


  

module.exports = router;


