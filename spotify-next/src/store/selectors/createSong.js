import { createSelector } from "reselect";

const createSongSelector = (state) => state.createSong;
export const getCreateSongIsLoading = createSelector(
  createSongSelector,
  (data) => data.data.isLoading
);

export const getCreateSong = createSelector(
  createSongSelector,
  (data) => data.data
);

export const getCreateSongError = createSelector(
  createSongSelector,
  (data) => data.data.error
);



