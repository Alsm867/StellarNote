import { csrfFetch } from "./csrf";

const ADD_NOTEBOOK = "session/ADD_NOTEBOOK";
const GET_NOTEBOOK = "session/GET_NOTEBOOK";
const DELETE_NOTEBOOK = "session/REMOVE_NOTE";

const addNotebook = notebook => ({
  type: ADD_NOTEBOOK,
  notebook,
});

const getNotebook = list => ({
  type: GET_NOTEBOOK,
  list,
});

const deleteNotebook = id => ({
  type: DELETE_NOTEBOOK,
  id,
});

export const getANotebook = userId => async dispatch => {
    const response = await fetch(`/api/notebook/${userId}`);

    if (response.ok) {
      const notebooks = await response.json();
      dispatch(getNotebook(notebooks));
      return response;
    }
  };

export const postNotebook = notebook => async dispatch => {
    const { name, userId } = notebook;
    const response = await csrfFetch("/api/notebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId }),
    });
    if (response.ok) {
      const notebook = await response.json();
      dispatch(addNotebook(notebook));
      return response;
    }
};

export const deleteANotebook = id => async dispatch => {
  const response = await csrfFetch(`/api/notebook/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await response.json();
    dispatch(deleteNotebook(id));
    return response;
  }
};

export const editNotebook = notebook => async dispatch => {
  const { name, id } = notebook;
  const response = await csrfFetch(`/api/notebook/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, id }),
  });
  if (response.ok) {
    const notebook = await response.json();
    dispatch(addNotebook(notebook));
    console.log("notebook response", notebook);
    return notebook;
  }
};

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTEBOOK: {
      if (action.notebook.id) {
        const newState = {
          ...state,
          [action.notebook.id]: action.notebook,
        };
        return newState;
      } else {
        return state;
      }
    }
    case GET_NOTEBOOK: {
      const newNotebooks = {};
      action.list.forEach(element => {
        newNotebooks[element.id] = element;
      });
      return {
        ...state,
        ...newNotebooks,
      };
    }
    case DELETE_NOTEBOOK: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default notebooksReducer;
