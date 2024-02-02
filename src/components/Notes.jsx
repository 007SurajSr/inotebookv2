// import React, { useContext, useEffect, useRef } from "react";
// import NoteContext from "./Context/NoteContext";
// import NoteItems from "./NoteItems";
// import AddNotes from "./AddNotes";

// const Notes = () => {
//   const context = useContext(NoteContext);
//   const { notes, getNotes } = context;
//   useEffect(() => {
//     getNotes() 
//     //eslint-disable-next-line
//   }, [])

//   const ref = useRef(null)
//   const updateNote = (note) => {
//      ref.current.click();

     

//   }
  

//   return (
//     <>
//       <AddNotes />
//       <button type="button" ref={ref}  className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal"></button>
//       <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"    aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
//               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               ...
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-primary">Save changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-3">
//         <h1>Your Notes</h1>
//         {notes.map((note) => {
//           return <NoteItems key={note._id} updateNote={updateNote} note={note} />
//         })}
//       </div>
//     </>
//   )
// }

// export default Notes

import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from './Context/NoteContext';
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
   const context = useContext(NoteContext);
   let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/')
        }
        
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
        
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNotes   />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert}   note={note} />
                })}
            </div>
        </>
    )
}

export default Notes