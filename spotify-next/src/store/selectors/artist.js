import { createSelector } from 'reselect';

const selectArtistData = state => state.artistDetails;

export const getArtistDetailsIsLoading = createSelector(
    selectArtistData,
    data => data.isLoading
);

export const getArtistDetails = createSelector(
    selectArtistData,
    data => data.data?.data?.data
);

export const getArtistDetailsError = createSelector(
    selectArtistData,
    data => data.error
);
