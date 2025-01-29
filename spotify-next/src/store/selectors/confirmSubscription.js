import { createSelector } from 'reselect';

const selectConfirmSubscriptionData = state => state.confirmSubscriptionDetails;

export const getConfirmSubscriptionDetailsIsLoading = createSelector(
    selectConfirmSubscriptionData,
    data => data.isLoading
);

export const getConfirmSubscriptionDetails = createSelector(
    selectConfirmSubscriptionData,
    data => data.data
);

export const getConfirmSubscriptionDetailsError = createSelector(
    selectConfirmSubscriptionData,
    data => data.error
);
