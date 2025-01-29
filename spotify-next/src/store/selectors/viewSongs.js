import { createSelector } from "reselect";

const viewSongSelector = (state) => state.viewSongs;
export const getViewSongIsLoading = createSelector(
  viewSongSelector,
  (data) => data.isLoading
);

export const getViewSong = createSelector(
  viewSongSelector,
  (data) => data.data?.data?.data?.songs
);

export const getViewSongError = createSelector(
  viewSongSelector,
  (data) => data.data.error
);



