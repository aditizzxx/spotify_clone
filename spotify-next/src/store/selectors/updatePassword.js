import { createSelector } from "reselect";

const updatePasswordSelector = (state) => state.updatePassword;

export const getUpdatePasswordIsLoading = createSelector(
  updatePasswordSelector,
  (data) => data.data.isLoading
);

export const getUpdatePassword = createSelector(
  updatePasswordSelector,
  (data) => data.data
);

export const getUpdatePasswordError = createSelector(
  updatePasswordSelector,
  (data) => data.error?.response
);