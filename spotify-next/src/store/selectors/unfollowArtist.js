import { createSelector } from 'reselect';

const selectUnfollowArtistData = state => state.unfollowArtistDetails;

export const getUnfollowArtistDetailsIsLoading = createSelector(
    selectUnfollowArtistData,
    data => data.isLoading
);

export const getUnfollowArtistDetails = createSelector(
    selectUnfollowArtistData,
    data => data.data
);

export const getUnfollowArtistDetailsError = createSelector(
    selectUnfollowArtistData,
    data => data.error
);
