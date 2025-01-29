import * as actionTypes from "../actionTypes";

export const resetfetchSearchPlaylistDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_SEARCH_PLAYLIST_DETAILS_WATCHER,
    payload,
});

export const fetchSearchPlaylistDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_SEARCH_PLAYLIST_WATCHER,
    payload
});

export const setSearchPlaylistDetailsSuccess = (payload) => ({
    type: actionTypes.SET_SEARCH_PLAYLIST_SUCCESS,
    payload,
});

export const setSearchPlaylistDetailsFailure = (payload) => ({
    type: actionTypes.SET_SEARCH_PLAYLIST_FAILURE,
    payload,
});
