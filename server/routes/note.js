const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const note = await Note.getAllNotes();
      res.send(note);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/insertNote', async (req, res) => {
    try {
      let note = await Note.read(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

.put('/edit', async (req, res) => {
    try {
      let note = await Note.editNotes(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
        let maxNoteID = await Note.getMaxId();
        // console.log(maxNoteID[0].maxID,req.body.noteID,1);
        if(maxNoteID < req.body.noteID || maxNoteID==0){
            // console.log(maxNoteID[0].maxID,req.body.noteID,11);
            res.send({failure: "Note not found."})
        }
        // console.log(maxNoteID[0].maxID,req.body.noteID,111);
        Note.deleteNotes(req.body);
        res.send({success: "Note deleted."})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
module.exports = router;