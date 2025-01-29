import * as actionTypes from "../actionTypes";

export const resetfetchSearchArtistDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_SEARCH_ARTIST_DETAILS_WATCHER,
    payload,
});

export const fetchSearchArtistDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_SEARCH_ARTIST_WATCHER,
    payload
});

export const setSearchArtistDetailsSuccess = (payload) => ({
    type: actionTypes.SET_SEARCH_ARTIST_SUCCESS,
    payload,
});

export const setSearchArtistDetailsFailure = (payload) => ({
    type: actionTypes.SET_SEARCH_ARTIST_FAILURE,
    payload,
});
