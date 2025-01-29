import { createSelector } from 'reselect';

const selectUsersData = state => state.users;

export const selectUser_isLoading = createSelector(
    selectUsersData,
    data => data.isLoading
);

export const getUserDetails = createSelector(
    selectUsersData,
    data => data.data
);

export const selectUser_Error = createSelector(
    selectUsersData,
    data => data.error
);
