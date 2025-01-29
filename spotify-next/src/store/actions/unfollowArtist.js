import * as actionTypes from "../actionTypes";

export const resetfetchUnfollowArtistDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_UNFOLLOW_ARTIST_DETAILS_WATCHER,
  payload,
});

export const fetchUnfollowArtistDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_UNFOLLOW_ARTIST_DETAILS_WATCHER,
  payload,
});

export const setUnfollowArtistDetailsSuccess = (payload) => ({
  type: actionTypes.SET_UNFOLLOW_ARTIST_DETAILS_SUCCESS,
  payload,
});

export const setUnfollowArtistDetailsFailure = (payload) => ({
  type: actionTypes.SET_UNFOLLOW_ARTIST_DETAILS_FAILURE,
  payload,
});
