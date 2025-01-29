import { createSelector } from "reselect";

const addToPlaylistSelector = (state) => state.addToPlaylist;
export const getAddToPlaylistIsLoading = createSelector(
  addToPlaylistSelector,
  (data) => data.data.isLoading
);

export const getAddToPlaylist = createSelector(
  addToPlaylistSelector,
  (data) => data.data?.data
);

export const getAddToPlaylistError = createSelector(
  addToPlaylistSelector,
  (data) => data.data.error
);



