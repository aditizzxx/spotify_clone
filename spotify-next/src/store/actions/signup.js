import * as actionTypes from "../actionTypes";

export const resetfetchSignupDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_SIGNUP_DETAILS_WATCHER,
    payload,
});

export const fetchSignupDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_SIGNUP_DETAILS_WATCHER,
    payload
});

export const setSignupDetailsSuccess = (payload) => ({
    type: actionTypes.SET_SIGNUP_DETAILS_SUCCESS,
    payload,
});

export const setSignupDetailsFailure = (payload) => ({
    type: actionTypes.SET_SIGNUP_DETAILS_FAILURE,
    payload,
});
