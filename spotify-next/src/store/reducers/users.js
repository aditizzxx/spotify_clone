import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.RESET_FETCH_USERS_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_USERS_DATA_ACTION:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      }
    case actionTypes.USERS_ACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.USERS_ACTION_FAILURE:
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
