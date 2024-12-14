import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const s1 ={
        "name": "Raman",
        "profile":"SDE"
    }
    const [state, setState]= useState(s1);
    const update= () => {
      setTimeout(() => {
        setState({
          "name": "aman",
          "profile":"Editor"
        })
      }, 800)
    }
    const notesInitial = []
    const [notes, setNotes] =useState(notesInitial)
    const getNote= async ()=>{
      const response= await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    }
    const addNote= async (title, description, tag)=>{
      const response= await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    }
    const editNote= async (id, title, description, tag)=>{
      const response= await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          'content-type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);

      for(let index=0; index<notes.length; index++)
        {
          const element =notes[index];
          if(element._id===id)
          {
            notes[index].title=title;
            notes[index].description=description;
            notes[index].tag=tag;
            break;
          }
        }
        setNotes(notes);
        // console.log(notes);
    }
    const deleteNote= async (id)=>{
      const response= await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      const json =response.json();
      console.log(json);
      const newNotes = notes.filter((note)=>{return note._id !==id})
      setNotes(newNotes);
    }
  return (
    <NoteContext.Provider value={{state, update, notes, setNotes, addNote, editNote, deleteNote, getNote}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

