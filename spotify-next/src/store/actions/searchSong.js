import * as actionTypes from "../actionTypes";

export const resetfetchSearchSongDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_SEARCH_SONG_DETAILS_WATCHER,
    payload,
});

export const fetchSearchSongDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_SEARCH_SONG_WATCHER,
    payload
});

export const setSearchSongDetailsSuccess = (payload) => ({
    type: actionTypes.SET_SEARCH_SONG_SUCCESS,
    payload,
});

export const setSearchSongDetailsFailure = (payload) => ({
    type: actionTypes.SET_SEARCH_SONG_FAILURE,
    payload,
});
