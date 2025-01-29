import * as actionTypes from "../actionTypes";

export const resetfetchUserRoleDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_USER_ROLE_DETAILS_WATCHER,
    payload,
});

export const fetchUserRoleDetailsAction = (payload) => ({
    type: actionTypes.FETCH_USER_ROLE_DATA_ACTION,
    payload
});

export const setUserRoleDetailsSuccess = (payload) => ({
    type: actionTypes.SET_USER_ROLE_ACTION_SUCCESS,
    payload,
});

export const setUserRoleDetailsFailure = (payload) => ({
    type: actionTypes.SET_USER_ROLE_ACTION_FAILURE,
    payload,
});
