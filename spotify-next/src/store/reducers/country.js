import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const countryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_FETCH_COUNTRY_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_COUNTRY_DETAILS_WATCHER:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      }
    case actionTypes.SET_COUNTRY_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.SET_COUNTRY_DETAILS_FAILURE:
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
