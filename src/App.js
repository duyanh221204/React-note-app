import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css"
import Home from "./Home"
import CreateNote from "./CreateNote";
import RecycleBin from "./RecycleBin";

const App = () =>
{
  const [notes, setNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);

  const addNote = (newNote) =>
  {
    setNotes(prev =>
    {
      return [...prev, newNote];
    });
  };

  const deleteNote = (id) =>
  {
    if (window.confirm("Are you sure you want to move this note to Recycle Bin?"))
    {
      const updatedNotes = notes.filter(note => note.id !== id);
      const deleted = notes.find(note => note.id === id);
      setNotes(updatedNotes);
      setDeletedNotes([...deletedNotes, deleted]);
    }
  };

  const restoreNote = (note) =>
  {
    if (window.confirm("Are you sure you want to restore this note?"))
    {
      setNotes(prev =>
      {
        return [...prev, note];
      });
      setDeletedNotes(deletedNotes.filter(deletedNote => deletedNote.id !== note.id));
    }
  }

  const permanentlyDeleteNotes = (id) =>
  {
    if (window.confirm("Are you sure you want to delete this note permanently?"))
    {
      setDeletedNotes(deletedNotes.filter(deletedNote => deletedNote.id !== id));
    }
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Add">Add a note</Link>
          </li>
          <li>
            <Link to="/RecycleBin">Recycle Bin</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Add" element={ <CreateNote addNote={ addNote } /> } />
        <Route path="/RecycleBin" element={ <RecycleBin /> } />
      </Routes>
    </div>
  );
}

export default App;