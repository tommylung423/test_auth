const auth = require('../middleware/auth');
const {Song, validatesong} = require('../models/songs');
const {Songlist, validate} = require('../models/songlist');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// ============songs====================//
//ADD SONGS 
router.post('/', auth,async (req, res) => {
  const { error } = validatesong(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let song = new Song({ name: req.body.name, url: req.body.url, start: req.body.start, end: req.body.end, listid: req.body.listid });
  try{
      const songlist = await Songlist.findOne({_id: req.body.listid})       
      if (songlist) {
        songlist.songs.push(song);
        songlist.save();
        song = await song.save();    
        res.json({ message: 'songs created!' }
        );
      } else {
        throw new Error; }
  }catch(error){
    res.status(500).send('The songlist with the given ID was not found! I did know why!');
  };
});
//SORT SONGLIST ORDER 
router.put('/:id',auth, async (req, res) => {
    validate(req, res);
    const songlist = await Songlist.findByIdAndUpdate(req.params.id,
    { 
      songs: req.body.songs,
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

//DELETE SONGS
router.delete('/:id',auth, async (req, res) => {
  validate(req, res);
  const song = await Song.findOneAndRemove({_id: req.params.id}, {'new': true});
  const deleteResult = await Songlist.findByIdAndUpdate(song.listid,
       { $pull:{'songs': song._id}}, {'new': true}
      );
  if (!song) return res.status(404).send('The song with the given ID was not found.');
  res.send(deleteResult);
  });

//UPDATE SONGS
router.put('/updatesong/:id', auth,async (req, res) => {
  validate(req, res);
  const { error } = validatesong(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const song = await Song.findByIdAndUpdate(req.params.id,
    { name: req.body.name, url: req.body.url, start: req.body.start, end: req.body.end}, { new: true });
  if (!song) return res.status(404).send('The song with the given ID was not found.');  
  res.send(song);
});
module.exports = router;


