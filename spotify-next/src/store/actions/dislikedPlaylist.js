import * as actionTypes from "../actionTypes";

export const resetfetchLDislikedPlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_DISLIKE_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchDislikedPlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_DISLIKE_PLAYLIST_WATCHER,
  payload,
});

export const setDislikedPlaylistSuccess = (payload) => ({
  type: actionTypes.SET_DISLIKE_PLAYLIST_SUCCESS,
  payload,
});

export const setDislikedPlaylistFailure = (payload) => ({
  type: actionTypes.SET_DISLIKE_PLAYLIST_FAILURE,
  payload,
});
