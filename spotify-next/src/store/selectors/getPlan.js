import { createSelector } from "reselect";

const planDetailsSelector = (state) => state.getPlanDetails;
export const getPlanDetailsIsLoading = createSelector(
  planDetailsSelector,
  (data) => data.data.isLoading
);

export const getPlanDetails = createSelector(
  planDetailsSelector,
  (data) => data.data?.data
);

export const getPlanError = createSelector(
  planDetailsSelector,
  (data) => data.data.error
);



