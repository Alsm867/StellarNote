import { csrfFetch } from "./csrf";
const GET_SPOTS = "search/getSpots";

const searchSpots = (spots) => ({
  type: GET_SPOTS,
    spots,
});

export const searchSpots = (input) => async (dispatch) => {
  const response = await csrfFetch("/api/search", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (response.ok) {
    const {result} = await response.json();
    dispatch(searchSpots(result));
  }
}

const initialState = { spots:[]};
const search = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
        newState = Object.assign({}, state);
        newState.spots = [...state.spots, action.spots]
        return newState;
    default:
      return state;
  }
};

export default search;
