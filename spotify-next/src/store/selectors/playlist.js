import { createSelector } from 'reselect';

const selectPlaylistData = state => state.getPlaylist;

export const getPlaylistDetailsIsLoading = createSelector(
    selectPlaylistData,
    data => data.isLoading
);

export const getPlaylistDetails = createSelector(
    selectPlaylistData,
    data => data.data?.data?.data?.playlist
);

export const getPlaylistDetailsError = createSelector(
    selectPlaylistData,
    data => data.error
);
