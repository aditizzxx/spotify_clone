import { createSelector } from "reselect";

const deleteSongSelector = (state) => state.deleteSong;

export const getDeleteSongIsLoading = createSelector(
  deleteSongSelector,
  (data) => data.isLoading
);

export const getDeleteSong = createSelector(
  deleteSongSelector,
  (data) => data.data
);

export const getDeleteSongError = createSelector(
  deleteSongSelector,
  (data) => data.error
);