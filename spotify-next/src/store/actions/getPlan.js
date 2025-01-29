import * as actionTypes from "../actionTypes";

export const resetfetchPlanDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_PLAN_DETAILS_WATCHER,
  payload,
});

export const fetchPlanDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_PLAN_DETAILS_WATCHER,
  payload,
});

export const setPlanDetailsSuccess = (payload) => ({
  type: actionTypes.SET_PLAN_DETAILS_SUCCESS,
  payload,
});

export const setPlanDetailsFailure = (payload) => ({
  type: actionTypes.SET_PLAN_DETAILS_FAILURE,
  payload,
});
