import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CreateNote = ({ addNote }) =>
{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const Navigate = useNavigate();

    const handleCreateNote = () =>
    {
        if (window.confirm("Are you sure you want to create a new note?"))
        {
            const currentTime = new Date();
            const created_time = format(currentTime, 'dd/MM/yyyy hh:mm aaa');
            const newNote = 
            {
                id: Date.now(),
                title,
                created_time,
                content
            };
            addNote(newNote);
            setTitle('');
            setContent('');
            Navigate("/");
        }
    };

    return (
        <div className="create-note">
            <div className="Input">
                <h1>Create a new note here!</h1>
                <input className="create-input" type="text" placeholder="Title" value={ title } onChange={(e) => setTitle(e.target.value)}></input>
                <button className="create-button" onClick={handleCreateNote}>Create!</button>
            </div>

            <div className="Input">
                <textarea className="create-content" placeholder="Content" value={ content } onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
        </div>
    );
};

export default CreateNote;