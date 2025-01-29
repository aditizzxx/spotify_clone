import { createSelector } from 'reselect';

const selectUsersDetails = state => state.userDetails;

export const getUserDetailsIsLoading = createSelector(
    selectUsersDetails,
    data => data.isLoading
);

export const getUserDetails = createSelector(
    selectUsersDetails,
    data => data.data
);

export const getUserDetailsError = createSelector(
    selectUsersDetails,
    data => data.error
);
