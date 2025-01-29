import { createSelector } from "reselect";

const removeFromPlaylistSelector = (state) => state.removeFromPlaylist;
export const getRemoveFromPlaylistIsLoading = createSelector(
  removeFromPlaylistSelector,
  (data) => data.data.isLoading
);

export const getRemoveFromPlaylist = createSelector(
  removeFromPlaylistSelector,
  (data) => data.data
);

export const getRemoveFromPlaylistError = createSelector(
  removeFromPlaylistSelector,
  (data) => data.data.error
);



