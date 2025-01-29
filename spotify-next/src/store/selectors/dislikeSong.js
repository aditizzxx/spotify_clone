import { createSelector } from "reselect";

const dislikeSongSelector = (state) => state.dislikeSong;
export const getDislikeSongIsLoading = createSelector(
  dislikeSongSelector,
  (data) => data.data.isLoading
);

export const getDislikeSong = createSelector(
  dislikeSongSelector,
  (data) => data.data
);

export const getDislikeSongError = createSelector(
  dislikeSongSelector,
  (data) => data.data.error
);



