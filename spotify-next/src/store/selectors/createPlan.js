import { createSelector } from "reselect";

const createPlanDetailsSelector = (state) => state.createPlanDetails;
export const getCreatePlanDetailsIsLoading = createSelector(
  createPlanDetailsSelector,
  (data) => data.data.isLoading
);

export const getCreatePlanDetails = createSelector(
  createPlanDetailsSelector,
  (data) => data.data
);

export const getCreatePlanError = createSelector(
  createPlanDetailsSelector,
  (data) => data.data.error
);



