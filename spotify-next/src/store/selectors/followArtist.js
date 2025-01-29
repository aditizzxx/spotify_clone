import { createSelector } from 'reselect';

const selectFollowArtistData = state => state.followArtistDetails;

export const getFollowArtistDetailsIsLoading = createSelector(
    selectFollowArtistData,
    data => data.isLoading
);

export const getFollowArtistDetails = createSelector(
    selectFollowArtistData,
    data => data.data?.data?.data
);

export const getFollowArtistDetailsError = createSelector(
    selectFollowArtistData,
    data => data.error
);
