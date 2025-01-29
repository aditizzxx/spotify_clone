import * as actionTypes from "../actionTypes";

export const resetfetchEditPlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_EDIT_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchEditPlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_EDIT_PLAYLIST_WATCHER,
  payload,
});

export const setEditPlaylistSuccess = (payload) => ({
  type: actionTypes.SET_EDIT_PLAYLIST_SUCCESS,
  payload,
});

export const setEditPlaylistFailure = (payload) => ({
  type: actionTypes.SET_EDIT_PLAYLIST_FAILURE,
  payload,
});
