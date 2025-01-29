import { createSelector } from "reselect";

const updateUserSelector = (state) => state.updateUserInfo;

export const getUpdateUserIsLoading = createSelector(
  updateUserSelector,
  (data) => data.data.isLoading
);

export const getUpdateUser = createSelector(
  updateUserSelector,
  (data) => data.data
);

export const getUpdateUserError = createSelector(
  updateUserSelector,
  (data) => data.error?.response
);