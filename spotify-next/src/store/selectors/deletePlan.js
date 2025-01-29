import { createSelector } from "reselect";

const deletePlanDetailsSelector = (state) => state.deletePlanDetails;
export const getDeletePlanDetailsIsLoading = createSelector(
  deletePlanDetailsSelector,
  (data) => data.data.isLoading
);

export const getDeletePlanDetails = createSelector(
  deletePlanDetailsSelector,
  (data) => data.data
);

export const getDeletePlanError = createSelector(
  deletePlanDetailsSelector,
  (data) => data.data.error
);



