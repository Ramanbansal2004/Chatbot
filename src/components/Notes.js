import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import NoteContext from "../context/Notes/NoteContext";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let history = useNavigate();
  const {showAlert} = props;
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNote()
    }
    else
    {
      history("/login")
    }
    // eslint-disable-next-line
  }, []);
  const [note, setNote]= useState({id:"", etitle: "", edescription: "", etag: ""})
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };
  const handleClick =(e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    getNote();
    refClose.current.click();
    props.showAlert("Note Updated", "success");
  }
  const onChange =(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  placeholder="name@example.com"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                  minLength={5}
                  required
                />
                <label htmlFor="etitle">Title</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  placeholder="Password"
                  onChange={onChange}
                  minLength={5}
                  required
                />
                <label htmlFor="edescription">Description</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  placeholder="Password"
                  onChange={onChange}
                />
                <label htmlFor="etag">Tag</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref= {refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Don't update
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container">
          {notes.length===0 && "No notes available"}
          </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
