import * as actionTypes from "../actionTypes";

export const resetfetchFollowArtistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_FOLLOW_ARTIST_DETAILS_WATCHER,
  payload,
});

export const fetchFollowArtistDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_FOLLOW_ARTIST_DETAILS_WATCHER,
  payload,
});

export const setFollowArtistDetailsSuccess = (payload) => ({
  type: actionTypes.SET_FOLLOW_ARTIST_DETAILS_SUCCESS,
  payload,
});

export const setFollowArtistDetailsFailure = (payload) => ({
  type: actionTypes.SET_FOLLOW_ARTIST_DETAILS_FAILURE,
  payload,
});
