import * as actionTypes from "../actionTypes";

export const resetfetchCreateSongDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_CREATE_SONG_DETAILS_WATCHER,
  payload,
});

export const fetchCreateSongWatcher = (payload) => ({
  type: actionTypes.FETCH_CREATE_SONG_WATCHER,
  payload,
});

export const setCreateSongSuccess = (payload) => ({
  type: actionTypes.SET_CREATE_SONG_SUCCESS,
  payload,
});

export const setCreateSongFailure = (payload) => ({
  type: actionTypes.SET_CREATE_SONG_FAILURE,
  payload,
});
