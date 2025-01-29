import * as actionTypes from "../actionTypes";

export const resetfetchUpdateUserDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_UPDATE_USER_DETAILS_WATCHER,
  payload,
});

export const fetchUpdateUserWatcher = (payload) => ({
  type: actionTypes.FETCH_UPDATE_USER_WATCHER,
  payload,
});

export const setUpdateUserSuccess = (payload) => ({
  type: actionTypes.SET_UPDATE_USER_SUCCESS,
  payload,
});

export const setUpdateUserFailure = (payload) => ({
  type: actionTypes.SET_UPDATE_USER_FAILURE,
  payload,
});
