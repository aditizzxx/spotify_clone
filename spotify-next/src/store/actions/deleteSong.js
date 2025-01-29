import * as actionTypes from "../actionTypes";

export const resetfetchDeleteSongDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_DELETE_SONG_DETAILS_WATCHER,
  payload,
});

export const fetchDeleteSongWatcher = (payload) => ({
  type: actionTypes.FETCH_DELETE_SONG_WATCHER,
  payload,
});

export const setDeleteSongSuccess = (payload) => ({
  type: actionTypes.SET_DELETE_SONG_SUCCESS,
  payload,
});

export const setDeleteSongFailure = (payload) => ({
  type: actionTypes.SET_DELETE_SONG_FAILURE,
  payload,
});
