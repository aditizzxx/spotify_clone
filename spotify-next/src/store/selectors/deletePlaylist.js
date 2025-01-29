import { createSelector } from "reselect";

const deletePlaylistSelector = (state) => state.deletePlaylist;

export const getDeletePlaylistIsLoading = createSelector(
  deletePlaylistSelector,
  (data) => data.data.isLoading
);

export const getDeletePlaylist = createSelector(
  deletePlaylistSelector,
  (data) => data.data
);

export const getDeletePlaylistError = createSelector(
  deletePlaylistSelector,
  (data) => data.data.error
);