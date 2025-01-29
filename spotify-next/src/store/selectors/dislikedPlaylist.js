import { createSelector } from "reselect";

const dislikedPlaylistSelector = (state) => state.dislikedPlaylist;
export const getdislikedPlaylistIsLoading = createSelector(
  dislikedPlaylistSelector,
  (data) => data.data.isLoading
);

export const getdislikedPlaylist = createSelector(
  dislikedPlaylistSelector,
  (data) => data.data
);

export const getdislikedPlaylistError = createSelector(
  dislikedPlaylistSelector,
  (data) => data.data.error
);



