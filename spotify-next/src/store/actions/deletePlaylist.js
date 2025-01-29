import * as actionTypes from "../actionTypes";

export const resetfetchDeletePlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_DELETE_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchDeletePlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_DELETE_PLAYLIST_WATCHER,
  payload,
});

export const setDeletePlaylistSuccess = (payload) => ({
  type: actionTypes.SET_DELETE_PLAYLIST_SUCCESS,
  payload,
});

export const setDeletePlaylistFailure = (payload) => ({
  type: actionTypes.SET_DELETE_PLAYLIST_FAILURE,
  payload,
});
