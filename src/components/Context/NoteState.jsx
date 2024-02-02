import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';


const NoteState = (props) => {
const host = "http://localhost:5000"
  // const s1 = {
  //   "name": 'Suraj',
  //   "class": '7a'
  // };
  
  //  const [state, setState] = useState(s1)
  //  const update = () =>{
  //   setTimeout (() => {
  //     setState({
  //       "name": 'Suraj Gupta',
  //       "class": '10a'
  //     })
  //   }, 1000);
  //  }
const notesInitials = []

const [notes, setNotes ] = useState(notesInitials)

//Get all notes
const getNotes= async () =>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },
});
const json = await response.json();
console.log(json);
setNotes(json);
}
//Add a new Note
const addNote = async (title, description, tag) =>{
  //TODO: API CALL
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },
  
    body: JSON.stringify({title, description, tag})
  });
  const note = await response.json();
  setNotes(notes.concat(note))
}

//Delete a Note
const deleteNote = async (id) =>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    }
  });
  const json =   response.json();
  console.log(json);

  console.log("Deleting the note with id" +id)
  const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes);
}
//Edit any Note
const editNote = async (id, title, description,tag) =>{
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  },

  body: JSON.stringify({title, description, tag})
});
const json = await response.json();
console.log(json);

let newNotes = JSON.parse(JSON.stringify(notes))
//Logic to edi in client
for(let index = 0; index < newNotes.length; index++){
  const element = newNotes[index];
  if(element._id === id){
    newNotes[index].title = title;
    newNotes[index].description = description;
    newNotes[index].tag = tag;
    break;
  }
}
setNotes(newNotes);
}

  return (
    <NoteContext.Provider value={{ notes, setNotes,  addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

 