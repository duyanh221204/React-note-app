import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () =>
{
    const [notes, setNotes] = useState([]); // Sử dụng useState thay cho useRef
    const deleteNote = useRef([]);
    const [search, setSearch] = useState('');
    const filteredNotes = notes.filter(
        (note) => note.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await axios.get(
                "https://demo_project-1-d5070894.deta.app/DuyAnh"
            );
            setNotes(response.data.data);
        };

        getData();
    }, []);

    return (
        <div className="home">
            <div className="Input">
                <h1>All notes</h1>
                <input className="note-input" type="text" placeholder="Search a note" value={ search } onChange={ (e) => setSearch(e.target.value) }></input>
            </div>
            <ul className="note-list">
                {
                    filteredNotes.map(note =>
                    (
                        <li className="note-item" key={ note.id }>
                            <h3 className="note-title">
                                Title: { note.title }
                            </h3>
                            <h4 className="note-time">
                                Created on: { note.created_time }
                            </h4>
                            <p className="note-content">
                                { note.content }
                            </p>
                            <div className="delete-button">
                                <button className="del-button" onClick={ () => deleteNote.current(note.id) }>Delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;
