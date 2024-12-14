import React, {useContext, useState} from "react";
import NoteContext from '../context/Notes/NoteContext'
const AddNote = (props) => {
    const context= useContext(NoteContext);
    const {addNote}= context;
    const [note, setNote]= useState({title: "", description: "", tag: ""})
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note Added", "success");
    }
    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <h2>Add a Note</h2>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="text"
          name= "title"
          onChange={onChange}
          value={note.title}
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="text"
          onChange={onChange}
          value={note.description}
        />
        <label htmlFor="floatingPassword">Description</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          placeholder="text"
          onChange={onChange}
          value={note.tag}
        />
        <label htmlFor="floatingPassword">Tag</label>
      </div>
      <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default AddNote;
