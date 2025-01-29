import * as actionTypes from "../actionTypes";

export const resetfetchInstituteDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_INSTITUTE_DETAILS_WATCHER,
    payload,
});

export const fetchInstituteDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_INSTITUTE_DETAILS_WATCHER,
    payload
});

export const setInstituteDetailsSuccess = (payload) => ({
    type: actionTypes.SET_INSTITUTE_DETAILS_SUCCESS,
    payload,
});

export const setInstituteDetailsFailure = (payload) => ({
    type: actionTypes.SET_INSTITUTE_DETAILS_FAILURE,
    payload,
});
