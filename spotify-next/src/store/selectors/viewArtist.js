import { createSelector } from "reselect";

const viewArtistDetailsSelector = (state) => state.viewArtist;
export const getViewArtistIsLoading = createSelector(
  viewArtistDetailsSelector,
  (data) => data.data.isLoading
);

export const getViewArtistDetails = createSelector(
  viewArtistDetailsSelector,
  (data) => data.data?.data
);

export const getViewArtistError = createSelector(
  viewArtistDetailsSelector,
  (data) => data.data.error
);



