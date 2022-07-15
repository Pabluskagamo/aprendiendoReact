import './App.css';
import {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';


const Note = (props)=>{
  const note = props.nota;

  const handleDelete = () =>{
    axios.delete('/notes/'+ note.id)
      .then((response)=>{
        console.log(response)
        window.location.reload(false);
      })
  }

  return(
    <li>
      <div className="card" style={{width: "50rem"}}>
        <div className="card-body">
          <h5 className="card-title">ID: {note.id}</h5>
          <p className="card-text">{note.texto}</p>
          <time>{note.date}</time>
          <p style={note.important ? {color: "green"} :{}}>Importante: {note.important ? 'Si': 'No'}</p>
          <button onClick={handleDelete} type="button" className="btn btn-danger borrarButton">Borrar</button>
        </div>
    </div>
    </li>
  )
}




function App() {
  const[notes, setNotes] = useState([])
  const[newNote, setNewNote] = useState('');
  const[important, setImportant] = useState(false);

  useEffect(()=>{
    console.log(axios);

    axios.get('/notes')
      .then((response) => {
        setNotes(response.data)
      })
  }, [])


  const handleChange = (event) =>{
    const note = event.target.value;
    setNewNote(note);
  }

  const createNote = (event) =>{
    event.preventDefault()

    const note = {
      id: notes.length + 1,
      texto: newNote,
      date: new Date().toISOString(),
      important: important
    }
    
    axios.post('/notes', note).then((response) =>{
      console.log('Respuesta', response)
      setNotes(notes.concat(response.data))
    })
    setNewNote('');
  }

  const changeImportant = (event) =>{
    event.preventDefault()
    setImportant(!important);
  }


  return (
    <div className="App">
      <h3>Esta es mi primera aplicacion con React.js</h3>
      <p>Notas:</p>
      <div className="Notes">
        <ol>
          {notes.map((note) => { 
            return <Note key={note.id} nota={note}/>
          })}
        </ol>
      </div>
      <br></br>
      <div>
        <h5> Nueva nota: </h5>
        <form onSubmit={createNote}>
          <input type="text" onChange={handleChange} value={newNote}/>
          <button>Crear</button>
          <div>
            <button onClick={changeImportant}>Importante</button>
            <span>   : {important ? 'Si':'No'}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
