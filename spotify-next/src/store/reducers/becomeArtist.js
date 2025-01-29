import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const becomeArtistDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_FETCH_ARTIST_ROLE_WATCHER:
      return initialState;
    case actionTypes.FETCH_ARTIST_ROLE_WATCHER:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      }
    case actionTypes.SET_ARTIST_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.SET_ARTIST_ROLE_FAILURE:
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
