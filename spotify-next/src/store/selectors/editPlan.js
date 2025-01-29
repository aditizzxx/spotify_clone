import { createSelector } from "reselect";

const editPlanDetailsSelector = (state) => state.editPlanDetails;
export const getEditPlanDetailsIsLoading = createSelector(
  editPlanDetailsSelector,
  (data) => data.data.isLoading
);

export const getEditPlanDetails = createSelector(
  editPlanDetailsSelector,
  (data) => data.data
);

export const getEditPlanError = createSelector(
  editPlanDetailsSelector,
  (data) => data.data.error
);



