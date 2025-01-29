import * as actionTypes from "../actionTypes";

export const resetfetchDisApproveRequestDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_DISAPPROVE_REQUEST_DETAILS_WATCHER,
  payload,
});

export const fetchDisApproveRequestDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_DISAPPROVE_REQUEST_DETAILS_WATCHER,
  payload,
});

export const setDisApproveRequestDetailsSuccess = (payload) => ({
  type: actionTypes.SET_DISAPPROVE_REQUEST_DETAILS_SUCCESS,
  payload,
});

export const setDisApproveRequestDetailsFailure = (payload) => ({
  type: actionTypes.SET_DISAPPROVE_REQUEST_DETAILS_FAILURE,
  payload,
});
