import { createSelector } from 'reselect';

const searchSongData = state => state.searchSong;

export const getSearchSongDetailsIsLoading = createSelector(
    searchSongData,
    data => data.isLoading
);

export const getSearchSongDetails = createSelector(
    searchSongData,
    data => data.data?.data?.data
);

export const getSearchSongDetailsError = createSelector(
    searchSongData,
    data => data.error
);
