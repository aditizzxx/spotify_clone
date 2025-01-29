import * as actionTypes from "../actionTypes";

export const resetfetchEditPlanDetailsWatcher = (payload) => ({
  type: actionTypes.RESET_FETCH_EDIT_PLAN_DETAILS_WATCHER,
  payload,
});

export const fetchEditPlanDetailsWatcher = (payload) => ({
  type: actionTypes.FETCH_EDIT_PLAN_DETAILS_WATCHER,
  payload,
});

export const setEditPlanDetailsSuccess = (payload) => ({
  type: actionTypes.SET_EDIT_PLAN_DETAILS_SUCCESS,
  payload,
});

export const setEditPlanDetailsFailure = (payload) => ({
  type: actionTypes.SET_EDIT_PLAN_DETAILS_FAILURE,
  payload,
});
