import { createSelector } from 'reselect';

const searchArtistData = state => state.searchArtist;

export const getSearchArtistDetailsIsLoading = createSelector(
    searchArtistData,
    data => data.isLoading
);

export const getSearchArtistDetails = createSelector(
    searchArtistData,
    data => data.data?.data?.data
);

export const getSearchArtistDetailsError = createSelector(
    searchArtistData,
    data => data.error
);
