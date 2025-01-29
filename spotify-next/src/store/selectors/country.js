import { createSelector } from 'reselect';

const selectCountryData = state => state.countryDetails;

export const getCountryDetailsIsLoading = createSelector(
    selectCountryData,
    data => data.isLoading
);

export const getCountryDetails = createSelector(
    selectCountryData,
    data => data.data?.data
);

export const getCountryDetailsError = createSelector(
    selectCountryData,
    data => data.error
);
