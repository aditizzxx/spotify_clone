import * as actionTypes from "../actionTypes";

export const resetfetchForgotPasswordDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_FORGOT_PASSWORD_DETAILS_WATCHER,
  payload,
});

export const fetchForgotPasswordDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_FORGOT_PASSWORD_DETAILS_WATCHER,
  payload,
});

export const setForgotPasswordDetailsSuccess = (payload) => ({
  type: actionTypes.SET_FORGOT_PASSWORD_DETAILS_SUCCESS,
  payload,
});

export const setForgotPasswordDetailsFailure = (payload) => ({
  type: actionTypes.SET_FORGOT_PASSWORD_DETAILS_FAILURE,
  payload,
});
