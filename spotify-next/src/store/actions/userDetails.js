import * as actionTypes from "../actionTypes";

export const resetfetchUserDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_USER_DETAILS_WATCHER,
    payload,
});

export const fetchUserDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_USERS_DETAILS_ACTION,
    payload
});

export const setUserDetailsSuccess = (payload) => ({
    type: actionTypes.SET_USER_DETAILS_SUCCESS,
    payload,
});

export const setUserDetailsFailure = (payload) => ({
    type: actionTypes.SET_USER_DETAILS_FAILURE,
    payload,
});
