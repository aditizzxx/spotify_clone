import { createSelector } from 'reselect';

const selectForgotPasswordData = state => state.forgotPasswordDetails;

export const getForgotPasswordDetailsIsLoading = createSelector(
    selectForgotPasswordData,
    data => data.isLoading
);

export const getForgotPasswordDetails = createSelector(
    selectForgotPasswordData,
    data => data.data
);

export const getForgotPasswordDetailsError = createSelector(
    selectForgotPasswordData,
    data => data.error
);
