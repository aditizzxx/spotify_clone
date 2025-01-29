import { createSelector } from "reselect";

const editPlaylistSelector = (state) => state.editPlaylist;

export const getEditPlaylistIsLoading = createSelector(
  editPlaylistSelector,
  (data) => data.data.isLoading
);

export const getEditPlaylist = createSelector(
  editPlaylistSelector,
  (data) => data.data
);

export const getEditPlaylistError = createSelector(
  editPlaylistSelector,
  (data) => data.data.error
);