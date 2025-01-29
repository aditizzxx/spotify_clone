import * as actionTypes from "../actionTypes";

export const resetfetchViewArtistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_VIEW_ARTIST_DETAILS_WATCHER,
  payload,
});

export const fetchViewArtistDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_VIEW_ARTIST_DETAILS_WATCHER,
  payload,
});

export const setViewArtistDetailsSuccess = (payload) => ({
  type: actionTypes.SET_VIEW_ARTIST_DETAILS_SUCCESS,
  payload,
});

export const setViewArtistDetailsFailure = (payload) => ({
  type: actionTypes.SET_VIEW_ARTIST_DETAILS_FAILURE,
  payload,
});
