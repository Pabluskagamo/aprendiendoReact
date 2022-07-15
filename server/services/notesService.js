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

    const ids = notas['notes'].map((note)=>{
        return note.id;
    })
    console.log(ids);

    if(ids.length === 0){
        nuevaNota.id = 1;
    }else{
        nuevaNota.id = Math.max(...ids) + 1;
    }

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

notesService.deleteNote = (req, res) =>{
    const id = req.params.id;

    notas['notes'] = notas['notes'].filter((elem) =>{
        return elem.id != id;
    })

    fs.writeFile('files/notes.json', JSON.stringify(notas), err => {
        if (err) {
          console.error(err);
        }
        console.log('Nota borrada en fichero');
    });

    res.status(202).end();
}


module.exports = notesService;