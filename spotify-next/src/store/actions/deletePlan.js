import * as actionTypes from "../actionTypes";

export const resetfetchDeletePlanDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_DELETE_PLAN_DETAILS_WATCHER,
  payload,
});

export const fetchDeletePlanDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_DELETE_PLAN_DETAILS_WATCHER,
  payload,
});

export const setDeletePlanDetailsSuccess = (payload) => ({
  type: actionTypes.SET_DELETE_PLAN_DETAILS_SUCCESS,
  payload,
});

export const setDeletePlanDetailsFailure = (payload) => ({
  type: actionTypes.SET_DELETE_PLAN_DETAILS_FAILURE,
  payload,
});
