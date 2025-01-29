import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const editPlaylistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_FETCH_EDIT_PLAYLIST_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_EDIT_PLAYLIST_WATCHER:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      };
    case actionTypes.SET_EDIT_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.SET_EDIT_PLAYLIST_FAILURE:
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
