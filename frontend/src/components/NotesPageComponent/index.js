import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NotesPage.css";



function TheNotes(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes);
    const notebooks = useSelector(state => state.notebooks);

    return(
        <div className="main-notes">
            <div className='notebook-bar'>

            </div>
        </div>
    )
}


export default TheNotes;
