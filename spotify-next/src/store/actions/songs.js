import * as actionTypes from "../actionTypes";

export const resetfetchSongDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_SONG_DETAILS_WATCHER,
  payload,
});

export const fetchSongDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_SONG_DETAILS_WATCHER,
  payload,
});

export const setSongDetailsSuccess = (payload) => ({
  type: actionTypes.SET_SONG_DETAILS_SUCCESS,
  payload,
});

export const setSongDetailsFailure = (payload) => ({
  type: actionTypes.SET_SONG_DETAILS_FAILURE,
  payload,
});
