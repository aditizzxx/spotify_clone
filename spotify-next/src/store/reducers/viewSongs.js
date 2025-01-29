import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const viewSongsReducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case actionTypes.RESET_FETCH_VIEW_SONGS_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_VIEW_SONGS_WATCHER:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      };
    case actionTypes.SET_VIEW_SONGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.SET_VIEW_SONGS_FAILURE:
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
