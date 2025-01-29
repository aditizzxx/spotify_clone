import { createSelector } from 'reselect';

const selectSongData = state => state.song;

export const getSongDetailsIsLoading = createSelector(
    selectSongData,
    data => data.isLoading
);

export const getSongDetails = createSelector(
    selectSongData,
    data => data.data
);

export const getSongDetailsError = createSelector(
    selectSongData,
    data => data.error
);
