import { createSelector } from 'reselect';

const selectSignupData = state => state.signupdetails;

export const getSignupDetailsIsLoading = createSelector(
    selectSignupData,
    data => data.isLoading
);

export const getSignupDetails = createSelector(
    selectSignupData,
    data => data.data
);

export const getSignupDetailsError = createSelector(
    selectSignupData,
    data => data.error
);
