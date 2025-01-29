import * as actionTypes from "../actionTypes";

export const resetfetchUserSubscriptionDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_USER_SUBSCRIPTION_DETAILS_WATCHER,
    payload,
});

export const fetchUserSubscriptionDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_USER_SUBSCRIPTION_DETAILS_WATCHER,
    payload
});

export const setUserSubscriptionDetailsSuccess = (payload) => ({
    type: actionTypes.SET_USER_SUBSCRIPTION_DETAILS_SUCCESS,
    payload,
});

export const setUserSubscriptionDetailsFailure = (payload) => ({
    type: actionTypes.SET_USER_SUBSCRIPTION_DETAILS_FAILURE,
    payload,
});
