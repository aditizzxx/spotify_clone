import * as actionTypes from "../actionTypes";

export const resetfetchViewPlanDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_VIEW_PLAN_DETAILS_WATCHER,
  payload,
});

export const fetchViewPlanDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_VIEW_PLAN_DETAILS_WATCHER,
  payload,
});

export const setViewPlanDetailsSuccess = (payload) => ({
  type: actionTypes.SET_VIEW_PLAN_DETAILS_SUCCESS,
  payload,
});

export const setViewPlanDetailsFailure = (payload) => ({
  type: actionTypes.SET_VIEW_PLAN_DETAILS_FAILURE,
  payload,
});
