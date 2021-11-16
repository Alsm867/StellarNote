import { csrfFetch } from "./csrf";

const ADD_NOTE = "session/ADD_NOTE";
const GET_NOTES = "session/GET_NOTES";
const DELETE_NOTE = "session/DELETE_NOTE";

const addNotes = note => ({
  type: ADD_NOTE,
  note,
});

const getNotes = list => ({
  type: GET_NOTES,
  list,
});

const deleteANote = id => ({
  type: DELETE_NOTE,
  id,
});

export const postNote = note => async dispatch => {
    const { content, title, userId, notebookId } = note;
    const response = await csrfFetch("/api/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, title, userId, notebookId }),
    });
    if (response.ok) {
      const note = await response.json();
      dispatch(addNotes(note));
      return note;
    }
  };

  export const getTheNotes = userId => async dispatch => {
    const response = await fetch(`/api/note/${userId}`);

    if (response.ok) {
      const notes = await response.json();
      dispatch(getNotes(notes));
      return response;
    }
  };

export const deleteNote = id => async dispatch => {
  const response = await csrfFetch(`/api/note/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await response.json();
    dispatch(deleteANote(id));
    return response;
  }
};

export const editNote = note => async dispatch => {
  const { content, title, id, notebookId } = note;
  const response = await csrfFetch(`/api/note/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, title, id, notebookId }),
  });
  if (response.ok) {
    const note = await response.json();
    dispatch(addNotes(note));
    return response;
  }
};





const initialState = {};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      if (action.note.id) {
        const newState = {
          ...state,
          [action.note.id]: action.note,
        };
        return newState;
      } else {
        return state;
      }
    }
    case GET_NOTES: {
      const newNotes = {};
      action.list.forEach(element => {
        newNotes[element.id] = element;
      });
      return {
        ...state,
        ...newNotes,
      };
    }
    case DELETE_NOTE: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default notesReducer;
