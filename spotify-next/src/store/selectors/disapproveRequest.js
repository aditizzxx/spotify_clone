import { createSelector } from "reselect";

const disapproveRequestSelector = (state) => state.disapproveRequest;
export const getDisApproveRequestDetailsIsLoading = createSelector(
  disapproveRequestSelector,
  (data) => data.data.isLoading
);

export const getDisApproveRequestDetails = createSelector(
  disapproveRequestSelector,
  (data) => data.data
);

export const getDisApproveRequestError = createSelector(
  disapproveRequestSelector,
  (data) => data.data.error
);



