import * as actionTypes from "../actionTypes";

export const resetfetchRemoveFromPlaylistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_REMOVE_FROM_PLAYLIST_DETAILS_WATCHER,
  payload,
});

export const fetchRemoveFromPlaylistWatcher = (payload) => ({
  type: actionTypes.FETCH_REMOVE_FROM_PLAYLIST_WATCHER,
  payload,
});

export const setRemoveFromPlaylistSuccess = (payload) => ({
  type: actionTypes.SET_REMOVE_FROM_PLAYLIST_SUCCESS,
  payload,
});

export const setRemoveFromPlaylistFailure = (payload) => ({
  type: actionTypes.SET_REMOVE_FROM_PLAYLIST_FAILURE,
  payload,
});
