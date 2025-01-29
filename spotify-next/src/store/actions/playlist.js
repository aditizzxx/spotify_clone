import * as actionTypes from "../actionTypes";

export const resetfetchPlaylistDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_PLAYLIST_DETAILS_WATCHER,
    payload,
});

export const fetchPlaylistDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_PLAYLIST_DETAILS_WATCHER,
    payload
});

export const setPlaylistDetailsSuccess = (payload) => ({
    type: actionTypes.SET_PLAYLIST_DETAILS_SUCCESS,
    payload,
});

export const setPlaylistDetailsFailure = (payload) => ({
    type: actionTypes.SET_PLAYLIST_DETAILS_FAILURE,
    payload,
});
