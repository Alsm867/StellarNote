import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NotesPage.css";
import {postNote, getTheNotes, deleteNote, editNote} from '../../store/note';
import { getANotebook, postNotebook, deleteANotebook, editNotebook} from '../../store/notebook';




function TheNotes(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.note);
    const notebooks = useSelector(state => state.notebook);

    const [mainNote, setMainNote] = useState("");
    const [mainNoteTitle, setMainNoteTitle] = useState("");
    const [mainNoteContent, setMainNoteContent] = useState("");
    const [defaultNotebook, seDefaultNotebook] = useState("All Notes");

    const [open, setOpen] = useState(false);

    useEffect(() => dispatch(getTheNotes(sessionUser.id)), []);
  useEffect(() => dispatch(getANotebook(sessionUser.id)), []);
  useEffect(() => {}, [mainNote,
    mainNoteContent,
    mainNoteTitle,
    defaultNotebook,
    open,
  ]);
            // <div className='notebook-bar'>
            // {Object.keys(notebooks).map(book => (
            //     <div className='notebooks' onClick={() => seDefaultNotebook(notebooks[book])}>
            //     {notebooks[book].name}|
            //     </div>
            //     ))}
            // </div>
            // <div className='all-notes'>
            //     {Object.keys(notes).map(note => (
            //         <div className='single-notes'>
            //             {notes[note].content}
            //         </div>
            //     ))}
            // </div>


    return(
        <div className="main-notes">

        </div>
    )
}


export default TheNotes;
