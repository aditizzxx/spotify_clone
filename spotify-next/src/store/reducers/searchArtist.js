import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const searchArtistDetailsReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.RESET_FETCH_SEARCH_ARTIST_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_SEARCH_ARTIST_WATCHER:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      }
    case actionTypes.SET_SEARCH_ARTIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.SET_SEARCH_ARTIST_FAILURE:
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
