import * as actionTypes from "../actionTypes";

export const resetfetchLoginDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_LOGIN_DETAILS_WATCHER,
    payload,
});

export const fetchLoginAction = (payload) => ({
    type: actionTypes.FETCH_LOGIN_DETAILS_ACTION,
    payload
});

export const loginActionSuccess = (payload) => ({
    type: actionTypes.LOGIN_DETAILS_ACTION_SUCCESS,
    payload,
});

export const loginActionFailure = (payload) => ({
    type: actionTypes.LOGIN_DETAILS_ACTION_FAILURE,
    payload,
});
