import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};


export const viewPlaylistReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.RESET_FETCH_VIEW_PLAYLISTS_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_VIEW_PLAYLISTS_WATCHER:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      }
    case actionTypes.SET_VIEW_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.SET_VIEW_PLAYLISTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
