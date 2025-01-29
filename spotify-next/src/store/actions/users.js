import * as actionTypes from "../actionTypes";

export const resetfetchUserDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_USERS_DETAILS_WATCHER,
    payload,
});

export const fetchUserDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_USERS_DATA_ACTION,
    payload
});

export const userActionSuccess = (payload) => ({
    type: actionTypes.USERS_ACTION_SUCCESS,
    payload,
});

export const userActionFailure = (payload) => ({
    type: actionTypes.USERS_ACTION_FAILURE,
    payload,
});
