import * as actionTypes from "../actionTypes";

export const resetfetchCountryDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_COUNTRY_DETAILS_WATCHER,
    payload,
});

export const fetchCountryDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_COUNTRY_DETAILS_WATCHER,
    payload
});

export const setCountryDetailsSuccess = (payload) => ({
    type: actionTypes.SET_COUNTRY_DETAILS_SUCCESS,
    payload,
});

export const setCountryDetailsFailure = (payload) => ({
    type: actionTypes.SET_COUNTRY_DETAILS_FAILURE,
    payload,
});
