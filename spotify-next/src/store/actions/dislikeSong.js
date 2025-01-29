import * as actionTypes from "../actionTypes";

export const resetfetchDislikeSongDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_DISLIKE_SONG_DETAILS_WATCHER,
  payload,
});

export const fetchDislikeSongWatcher = (payload) => ({
  type: actionTypes.FETCH_DISLIKE_SONG_WATCHER,
  payload,
});

export const setDislikeSongSuccess = (payload) => ({
  type: actionTypes.SET_DISLIKE_SONG_SUCCESS,
  payload,
});

export const setDislikeSongFailure = (payload) => ({
  type: actionTypes.SET_DISLIKE_SONG_FAILURE,
  payload,
});
