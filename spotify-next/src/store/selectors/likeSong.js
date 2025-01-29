import { createSelector } from "reselect";

const likeSongSelector = (state) => state.likeSong;
export const getLikeSongIsLoading = createSelector(
  likeSongSelector,
  (data) => data.data.isLoading
);

export const getLikeSong = createSelector(
  likeSongSelector,
  (data) => data.data
);

export const getLikeSongError = createSelector(
  likeSongSelector,
  (data) => data.data.error
);



