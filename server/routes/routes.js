const express = require('express');
const router = express.Router();

//servicios
const notesService = require('../services/notesService');

router.get('/', (req, res)=> {
    res.send('Ruta principal de Esta API');
})

router.get('/notes', notesService.getAllNotes);

router.post('/notes', notesService.createNote);

router.delete('/notes/:id', notesService.deleteNote);

module.exports = router;