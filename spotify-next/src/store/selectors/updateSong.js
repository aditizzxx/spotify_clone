import { createSelector } from "reselect";

const updateSongSelector = (state) => state.updateSong;

export const getUpdateSongIsLoading = createSelector(
  updateSongSelector,
  (data) => data.data.isLoading
);

export const getUpdateSong = createSelector(
  updateSongSelector,
  (data) => data.data
);

export const getUpdateSongError = createSelector(
  updateSongSelector,
  (data) => data.error?.response
);