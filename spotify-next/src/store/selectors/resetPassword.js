import { createSelector } from 'reselect';

const selectResetPasswordData = state => state.resetPassword;

export const getResetPasswordDetailsIsLoading = createSelector(
    selectResetPasswordData,
    data => data.isLoading
);

export const getResetPasswordDetails = createSelector(
    selectResetPasswordData,
    data => data.data
);

export const getResetPasswordDetailsError = createSelector(
    selectResetPasswordData,
    data => data.error
);
