import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NotesPage.css";
import { postNote, getTheNotes, editNote, deleteNote } from "../../store/note";
import {
    postNotebook,
    getANotebook,
    editNotebook,
    deleteANotebook,
} from "../../store/notebook";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import ReactHtmlParser from 'react-html-parser';

function TheNotes() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session?.user);
  const notes = useSelector((state) => state?.note);
  const notebooks = useSelector((state) => state?.notebook);
  const [newNote, setNewNote] = useState(true);
  const [content, setContent] = useState("");
  const [title, setNewNoteTitle] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setMainNoteContent] = useState("");
  const [currentNotebook, setCurrentNotebook] = useState("Your Notes");
  const [name, setName] = useState("");
  const [newNotebookTitle, setNewNotebookTitle] = useState("");
  const [open, setOpen] = useState(false);

  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'undo',
        'redo'
      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    },
    language: 'en'
  };

  CKEditor.editorConfig = function (config) {
    config.removePlugins = 'style';
  }






  useEffect(() => dispatch(getTheNotes(sessionUser.id)), []);
  useEffect(() => dispatch(getANotebook(sessionUser.id)), []);
  useEffect(() => {},
  [ currentNote,
    currentContent,
    currentTitle,
    currentNotebook,
    open, ]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNote) {
      const payload = {
        userId: sessionUser.id,
        notebookId: currentNotebook.id,
        content,
        title,
      };
      let createdNote = await dispatch(postNote(payload));
      setCurrentNote(createdNote);
      postNewNote();
      return;
    }
    const editPayload = {
      id: currentNote.id,
      notebookId: currentNotebook.id,
      content: currentContent,
      title: currentTitle,
    };
    await dispatch(editNote(editPayload));
    await dispatch(getTheNotes(sessionUser.id));
  };


  const changeBookName = async (e) => {
    setOpen(!open);
    const editPayload = {
      id: currentNotebook.id,
      name: newNotebookTitle,
    };
    let editedNotebook = await dispatch(editNotebook(editPayload));
    await dispatch(getANotebook(sessionUser.id));
    setCurrentNotebook(editedNotebook);
  };


  const handleNoteDelete = async (e) => {
    e.preventDefault();
    const id = currentNote.id;
    setCurrentNote("");
    await dispatch(deleteNote(id));
    postNewNote();
  };

  const handleBookDelete = async (e) => {
    setOpen(!open);
    await dispatch(deleteANotebook(currentNotebook.id));
    setCurrentNotebook("Your Notes");
  };

  const postBook = async (e) => {
    e.preventDefault();
    if (name === "") return;
    const payload = {
      userId: sessionUser.id,
      name,
    };
    await dispatch(postNotebook(payload));
  };

  const setBook = (note) => (
    <li
      className="each-note"
      key={note.id}
      onClick={() => {
        setCurrentNote(note);
        setCurrentTitle(note.title);
        setMainNoteContent(note.content);
        setNewNote(false);
    }}
    >
      <span className='list-title'>{note?.title}</span>
      <p className='list-note'>{ReactHtmlParser(note.content)}</p>
      </li>
      );

      const displayBook = (notebook) => {
          if (notebook === "Your Notes") {
              return Object.values(notes).map((note) => setBook(note));
    } else {
      return Object.values(notes).map((note) => {
        if (note.notebookId === currentNotebook.id) {
          return setBook(note);
        }
      });
    }
  };


  function postNewNote() {
    setCurrentTitle("");
    setMainNoteContent("");
    setCurrentNote("");
    setNewNoteTitle("");
    setContent("");
    setNewNote(true);
  }


  return (
    <div className='main-notes'>
      <div className="notebook-bar">

        <div className='notebooks'>
            {Object.keys(notebooks).map((key) => (
              <div
                className="each-book"
                key={key}
                onClick={() => setCurrentNotebook(notebooks[key])}
              >
                | {notebooks[key].name} |
              </div>
            ))}
        </div>
        <div>
          <div>
            <input
              className='new-book-title'
              placeholder="New Notebook..."
              onChange={(e) => setName(e.target.value)}
              required="required"
            ></input>
            <button
              className='add-book-bttn'
              type="submit"
              onClick={postBook}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="note-preview">
        <div className='notebook-title'>
          <h1>
            {currentNotebook.name || currentNotebook}
          </h1>
          {currentNotebook != "Your Notes" ? (
            <button className='edit-bttn' onClick={() => setOpen(!open)}>
              <span className='the-span'>Edit Notebook</span>
            <img className='edit' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637720523/Styckr/Untitled_design_13_iror3l.png' alt='edit'/>
            </button>
          ) : (
            ""
          )}
        </div>

        <button className='new-note' onClick={postNewNote}>
           New Note
            </button>
        <ul className='list-notes'>{displayBook(ReactHtmlParser(currentNotebook))}</ul>
      </div>
      <div className="taking-notes">
        {open && (
          <div className='edit-notebook-title'>
            <form  onSubmit={changeBookName}>
              <input
               className='new-book-holder'
                placeholder="Rename notebook"
                required
                onChange={(e) => setNewNotebookTitle(e.target.value)}
              ></input>
              <button className='delete-note'onClick={handleBookDelete}>
              <span className='the-third-span'>Delete Book</span>
                <img className='delete-icon' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637285228/Styckr/Untitled_design_4_cnhbc4.png' alt='delete'/>
              </button>
              <button className='save-note'type='submit'>
              <span className='the-second-span'>Save Book</span>
              <img className='save-icon' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637285174/Styckr/Untitled_design_3_yhtnq6.png' alt='save'/>
              </button>


            </form>
          </div>
        )}
        <form className='note-form'>
          <input
            className='book-title'
            placeholder="Name your note..."
            value={currentTitle ? currentTitle : title}
            onChange={
              newNote
                ? (e) => setNewNoteTitle(e.target.value)
                : (e) => setCurrentTitle(e.target.value)
            }
          ></input>
            <div >

              <button className='delete-note' onClick={handleNoteDelete}>
                <span className='the-third-span'>Delete Note</span>
                <img className='delete-icon' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637285228/Styckr/Untitled_design_4_cnhbc4.png' alt='delete'/>
              </button>
              <button className='save-note' onClick={handleSubmit}>
                <span className='the-second-span'>Save Note</span>
              <img className='save-icon' src='https://res.cloudinary.com/dzjkwepju/image/upload/v1637285174/Styckr/Untitled_design_3_yhtnq6.png' alt='save'/>
              </button>
            </div>
          {/* <textarea
            className='note-loca'
            placeholder="Your Stellar Notes Go Here!"
            onChange={
              newNote
              ? (e) => setContent(e.target.value)
              : (e) => setMainNoteContent(e.target.value)
            }value={currentContent ? currentContent : content}
            ></textarea> */}
          <div>
            <CKEditor
            editor={ClassicEditor}
            data={currentContent ? currentContent : content}
            value={currentContent ? currentContent : content}
            onChange={(e, editor)=> {
              const data = editor.getData();
              newNote ? setContent(data) : setMainNoteContent(data)
            }}/>
          </div>
          <div>
            <p >
              {currentNotebook.name ? currentNotebook.name : currentNotebook}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TheNotes;
