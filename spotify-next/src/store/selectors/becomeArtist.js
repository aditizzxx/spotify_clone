import { createSelector } from 'reselect';

const selectArtistRoleData = state => state.becomeArtist;

export const getArtistRoleIsLoading = createSelector(
    selectArtistRoleData,
    data => data.isLoading
);

export const getArtistRole = createSelector(
    selectArtistRoleData,
    data => data.data?.data
);

export const getArtistRoleError = createSelector(
    selectArtistRoleData,
    data => data.error
);
