import * as actionTypes from "../actionTypes";

export const resetfetchApproveRequestDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_APPROVE_REQUEST_DETAILS_WATCHER,
  payload,
});

export const fetchApproveRequestDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_APPROVE_REQUEST_DETAILS_WATCHER,
  payload,
});

export const setApproveRequestDetailsSuccess = (payload) => ({
  type: actionTypes.SET_APPROVE_REQUEST_DETAILS_SUCCESS,
  payload,
});

export const setApproveRequestDetailsFailure = (payload) => ({
  type: actionTypes.SET_APPROVE_REQUEST_DETAILS_FAILURE,
  payload,
});
