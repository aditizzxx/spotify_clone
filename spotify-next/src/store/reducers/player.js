import * as actionTypes from "../actionTypes";

const initialState = {
    name: "player",
    initialState: { isPlaying: true },
    // error: null,
};

export const playerDetailsReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.FETCH_PLAYER_PLAY_PAUSE_DETAILS_WATCHER:
      // console.log(action);
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    default:
      return state;
  }
};
