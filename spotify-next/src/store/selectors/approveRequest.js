import { createSelector } from "reselect";

const approveRequestSelector = (state) => state.approveRequest;
export const getApproveRequestDetailsIsLoading = createSelector(
  approveRequestSelector,
  (data) => data.data.isLoading
);

export const getApproveRequestDetails = createSelector(
  approveRequestSelector,
  (data) => data.data
);

export const getApproveRequestError = createSelector(
  approveRequestSelector,
  (data) => data.data.error
);



