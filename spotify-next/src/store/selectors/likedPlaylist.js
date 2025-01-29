import { createSelector } from "reselect";

const likedPlaylistSelector = (state) => state.likedPlaylist;
export const getLikedPlaylistIsLoading = createSelector(
  likedPlaylistSelector,
  (data) => data.data.isLoading
);

export const getLikedPlaylist = createSelector(
  likedPlaylistSelector,
  (data) => data.data
);

export const getLikedPlaylistError = createSelector(
  likedPlaylistSelector,
  (data) => data.data.error
);



