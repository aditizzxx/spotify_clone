import { createSelector } from "reselect";

const createPlaylistSelector = (state) => state.createPlaylist;
export const getCreatePlaylistIsLoading = createSelector(
  createPlaylistSelector,
  (createPlaylist) => createPlaylist.createPlaylist.isLoading
);

export const getCreatePlaylist = createSelector(
  createPlaylistSelector,
  (createPlaylist) => createPlaylist.createPlaylist.data?.data
);

export const getCreatePlaylistError = createSelector(
  createPlaylistSelector,
  (createPlaylist) => createPlaylist.createPlaylist.error
);



