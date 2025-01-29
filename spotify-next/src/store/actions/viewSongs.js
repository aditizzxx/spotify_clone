import * as actionTypes from "../actionTypes";

export const resetfetchViewSongsDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_VIEW_SONGS_DETAILS_WATCHER,
  payload,
});

export const fetchViewSongsWatcher = (payload) => ({
  type: actionTypes.FETCH_VIEW_SONGS_WATCHER,
  payload,
});

export const setViewSongsSuccess = (payload) => ({
  type: actionTypes.SET_VIEW_SONGS_SUCCESS,
  payload,
});

export const setViewSongsFailure = (payload) => ({
  type: actionTypes.SET_VIEW_SONGS_FAILURE,
  payload,
});
