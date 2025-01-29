import { createSelector } from 'reselect';

const userRoleData = state => state.userRoleDetails;

export const getUserRoleDetailsIsLoading = createSelector(
    userRoleData,
    data => data.isLoading
);

export const getUserRoleDetails = createSelector(
    userRoleData,
    data => data.data?.data
);

export const getUserRoleDetailsError = createSelector(
    userRoleData,
    data => data.error
);
