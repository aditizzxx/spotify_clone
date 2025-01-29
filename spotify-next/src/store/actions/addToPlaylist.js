import * as actionTypes from "../actionTypes";

export const resetfetchAddToPlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_ADD_TO_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchAddToPlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_ADD_TO_PLAYLIST_WATCHER,
  payload,
});

export const setAddToPlaylistSuccess = (payload) => ({
  type: actionTypes.SET_ADD_TO_PLAYLIST_SUCCESS,
  payload,
});

export const setAddToPlaylistFailure = (payload) => ({
  type: actionTypes.SET_ADD_TO_PLAYLIST_FAILURE,
  payload,
});
