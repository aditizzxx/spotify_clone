import * as actionTypes from "../actionTypes";

export const resetfetchResetPasswordDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_RESET_PASSWORD_DETAILS_WATCHER,
    payload,
});

export const fetchResetPasswordDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_RESET_PASSWORD_DETAILS_WATCHER,
    payload
});

export const setResetPasswordDetailsSuccess = (payload) => ({
    type: actionTypes.SET_RESET_PASSWORD_DETAILS_SUCCESS,
    payload,
});

export const setResetPasswordDetailsFailure = (payload) => ({
    type: actionTypes.SET_RESET_PASSWORD_DETAILS_FAILURE,
    payload,
});
