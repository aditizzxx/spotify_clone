import * as actionTypes from "../actionTypes";

export const resetfetchLikeSongDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_LIKE_SONG_DETAILS_WATCHER,
  payload,
});

export const fetchLikeSongWatcher = (payload) => ({
  type: actionTypes.FETCH_LIKE_SONG_WATCHER,
  payload,
});

export const setLikeSongSuccess = (payload) => ({
  type: actionTypes.SET_LIKE_SONG_SUCCESS,
  payload,
});

export const setLikeSongFailure = (payload) => ({
  type: actionTypes.SET_LIKE_SONG_FAILURE,
  payload,
});
