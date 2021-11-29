import { csrfFetch } from "./csrf";
const GET_NOTES = "search/getNotes";

const searchNote = (content) => ({
  type: GET_NOTES,
  content,
});

export const searchNotes = (input) => async (dispatch) => {
    const response = await csrfFetch("/api/search", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({input}),
    });
    if (response.ok) {
        const content = await response.json();
    dispatch(searchNote(content));
  }
}

const initialState = { content:[]};
const searchReducer = (state = initialState, action) => {
    let newState;
  switch (action.type) {
    case GET_NOTES:
        newState = Object.assign({}, state);
        newState.content = [...state.content, action.content]
        return newState;
    default:
      return state;
  }
};

export default searchReducer;
