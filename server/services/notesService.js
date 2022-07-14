const notesService = {}
const fs = require('fs');

let notas = {
    notes: []
};

fs.readFile('files/notes.json',(err, data) =>{
    if(err){
        console.log(err);
        return;
    }
    notas = JSON.parse(data);
})


notesService.getAllNotes = (req, res) =>{
    res.json(notas['notes']);
}


notesService.createNote = (req, res) =>{
    const nuevaNota = req.body;

    notas['notes'] = notas['notes'].concat(nuevaNota);

    console.log(notas);

    fs.writeFile('files/notes.json', JSON.stringify(notas), err => {
        if (err) {
          console.error(err);
        }
        console.log('Nota guardada en fichero');
    });

    res.json(nuevaNota);
}


module.exports = notesService;