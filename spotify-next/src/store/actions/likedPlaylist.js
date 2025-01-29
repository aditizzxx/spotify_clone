import * as actionTypes from "../actionTypes";

export const resetfetchLikedPlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_LIKE_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchLikedPlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_LIKE_PLAYLIST_WATCHER,
  payload,
});

export const setLikedPlaylistSuccess = (payload) => ({
  type: actionTypes.SET_LIKE_PLAYLIST_SUCCESS,
  payload,
});

export const setLikedPlaylistFailure = (payload) => ({
  type: actionTypes.SET_LIKE_PLAYLIST_FAILURE,
  payload,
});
