import * as actionTypes from "../actionTypes";

export const resetfetchConfirmSubscriptionDetailsWatcher = (payload) => ({
    type: actionTypes.RESET_FETCH_CONFIRM_SUBSCRIPTION_DETAILS_WATCHER,
    payload,
});

export const fetchConfirmSubscriptionDetailsWatcher = (payload) => ({
    type: actionTypes.FETCH_CONFIRM_SUBSCRIPTION_DETAILS_WATCHER,
    payload
});

export const setConfirmSubscriptionDetailsSuccess = (payload) => ({
    type: actionTypes.SET_CONFIRM_SUBSCRIPTION_DETAILS_SUCCESS,
    payload,
});

export const setConfirmSubscriptionDetailsFailure = (payload) => ({
    type: actionTypes.SET_CONFIRM_SUBSCRIPTION_DETAILS_FAILURE,
    payload,
});
