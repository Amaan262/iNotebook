import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = `http://localhost:5000`;
  const notesInitial = [];

  const [alert,setAlert]= useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    // console.log("Adding a New Note", response.json);
    
    // const note = {
      //   _id: "1556f56v66226fv64v46va46fv",
    //   user: "62f3ab52c93c7279aaac49d3",
    //   title: title ? title : "",
    //   description: description ? description : "",
    //   tag: tag ? tag : "",
    //   date: "2022-08-13T17:40:21.813Z",
    //   __v: 0,
    // };
    const note = await response.json();
    // console.log(note);
    setNotes(notes.concat(note));
    showAlert("Note is Added","success");
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Note deleted with id ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showAlert("Note is deleted","danger");

  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes)
    showAlert("Note is Edited","warning");

  };

  return (
    <NoteContext.Provider
      value={{ notes , addNote, editNote, deleteNote, getNotes, alert, showAlert }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
