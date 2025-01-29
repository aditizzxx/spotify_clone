import { createSelector } from 'reselect';

const selectUserSubscriptionData = state => state.userSubscription;

export const getUserSubscriptionDetailsIsLoading = createSelector(
    selectUserSubscriptionData,
    data => data.isLoading
);

export const getUserSubscriptionDetails = createSelector(
    selectUserSubscriptionData,
    data => data.data
);

export const getUserSubscriptionDetailsError = createSelector(
    selectUserSubscriptionData,
    data => data.error
);
