import { createSelector } from 'reselect';

const selectInstituteData = state => state.instituteDetails;

export const getInstituteDetailsIsLoading = createSelector(
    selectInstituteData,
    data => data.isLoading
);

export const getInstituteDetails = createSelector(
    selectInstituteData,
    data => data.data?.data
);

export const getInstituteDetailsError = createSelector(
    selectInstituteData,
    data => data.error
);
