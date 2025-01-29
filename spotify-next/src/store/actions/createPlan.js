import * as actionTypes from "../actionTypes";

export const resetfetchCreatePlanDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_CREATE_PLAN_DETAILS_WATCHER,
  payload,
});

export const fetchCreatePlanDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_CREATE_PLAN_DETAILS_WATCHER,
  payload,
});

export const setCreatePlanDetailsSuccess = (payload) => ({
  type: actionTypes.SET_CREATE_PLAN_DETAILS_SUCCESS,
  payload,
});

export const setCreatePlanDetailsFailure = (payload) => ({
  type: actionTypes.SET_CREATE_PLAN_DETAILS_FAILURE,
  payload,
});
