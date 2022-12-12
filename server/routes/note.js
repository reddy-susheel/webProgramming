const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const Note = await User.getAllUsers();
      res.send(Note);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/insert', async (req, res) => {
    try {
      let noteID = await Note.insert(req.body);
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

.put('/edit', async (req, res) => {
    try {
      let noteID = await Note.editnote(req.body);
      res.send(note);
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      User.deleteNote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
module.exports = router;