import * as actionTypes from "../actionTypes";

export const resetfetchArtistRoleWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_ARTIST_ROLE_WATCHER,
  payload,
});

export const fetchArtistRoleWatcher = (payload) => ({
  type: actionTypes.FETCH_ARTIST_ROLE_WATCHER,
  payload,
});

export const setArtistRoleSuccess = (payload) => ({
  type: actionTypes.SET_ARTIST_ROLE_SUCCESS,
  payload,
});

export const setArtistRoleFailure = (payload) => ({
  type: actionTypes.SET_ARTIST_ROLE_FAILURE,
  payload,
});
