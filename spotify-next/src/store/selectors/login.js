import { createSelector } from 'reselect';

const selectLoginData = state => state.login;

export const login_isLoading = createSelector(
    selectLoginData,
    data => data.isLoading
);

export const login_Data = createSelector(
    selectLoginData,
    data => data.data
);

export const login_Error = createSelector(
    selectLoginData,
    data => data.error?.response?.data
);

