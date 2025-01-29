import * as actionTypes from "../actionTypes";

export const resetfetchViewPlaylistsDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_VIEW_PLAYLISTS_DETAILS_WATCHER,
    payload,
});

export const fetchViewPlaylistsDetailsWatcher = (id) => ({
    type: actionTypes.FETCH_VIEW_PLAYLISTS_WATCHER,
    payload : id
});

export const viewPlaylistsActionSuccess = (data) => ({
    type: actionTypes.SET_VIEW_PLAYLISTS_SUCCESS,
    payload: data,
});

export const viewPlaylistsActionFailure = (error) => ({
    type: actionTypes.SET_VIEW_PLAYLISTS_FAILURE,
    payload: error,
});
