import * as actionTypes from "../actionTypes";

export const resetfetchArtistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_ARTIST_DETAILS_WATCHER,
  payload,
});

export const fetchArtistDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_ARTIST_DETAILS_WATCHER,
  payload,
});

export const setArtistDetailsSuccess = (payload) => ({
  type: actionTypes.SET_ARTIST_DETAILS_SUCCESS,
  payload,
});

export const setArtistDetailsFailure = (payload) => ({
  type: actionTypes.SET_ARTIST_DETAILS_FAILURE,
  payload,
});
