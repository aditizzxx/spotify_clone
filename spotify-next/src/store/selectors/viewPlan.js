import { createSelector } from "reselect";

const viewPlanDetailsSelector = (state) => state.viewPlanDetails;
export const getViewPlanDetailsIsLoading = createSelector(
  viewPlanDetailsSelector,
  (data) => data.data.isLoading
);

export const getViewPlanDetails = createSelector(
  viewPlanDetailsSelector,
  (data) => data.data?.data
);

export const getViewPlanError = createSelector(
  viewPlanDetailsSelector,
  (data) => data.data.error
);



