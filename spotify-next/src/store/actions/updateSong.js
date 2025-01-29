import * as actionTypes from "../actionTypes";

export const resetfetchUpdateSongDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_UPDATE_SONG_DETAILS_WATCHER,
  payload,
});

export const fetchUpdateSongWatcher = (payload) => ({
  type: actionTypes.FETCH_UPDATE_SONG_WATCHER,
  payload,
});

export const setUpdateSongSuccess = (payload) => ({
  type: actionTypes.SET_UPDATE_SONG_SUCCESS,
  payload,
});

export const setUpdateSongFailure = (payload) => ({
  type: actionTypes.SET_UPDATE_SONG_FAILURE,
  payload,
});
