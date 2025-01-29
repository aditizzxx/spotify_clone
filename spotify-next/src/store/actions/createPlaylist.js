import * as actionTypes from "../actionTypes";

export const resetfetchCreatePlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_CREATE_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchCreatePlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_CREATE_PLAYLIST_WATCHER,
  payload,
});

export const setCreatePlaylistSuccess = (payload) => ({
  type: actionTypes.SET_CREATE_PLAYLIST_SUCCESS,
  payload,
});

export const setCreatePlaylistFailure = (payload) => ({
  type: actionTypes.SET_CREATE_PLAYLIST_FAILURE,
  payload,
});
