import * as actionTypes from "../actionTypes";

export const resetfetchUpdatePasswordDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_UPDATE_PASSWORD_DETAILS_WATCHER,
  payload,
});

export const fetchUpdatePasswordWatcher = (payload) => ({
  type: actionTypes.FETCH_UPDATE_PASSWORD_WATCHER,
  payload,
});

export const setUpdatePasswordSuccess = (payload) => ({
  type: actionTypes.SET_UPDATE_PASSWORD_SUCCESS,
  payload,
});

export const setUpdatePasswordFailure = (payload) => ({
  type: actionTypes.SET_UPDATE_PASSWORD_FAILURE,
  payload,
});
