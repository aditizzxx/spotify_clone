import { createSelector } from 'reselect';

const searchPlaylistData = state => state.searchPlaylist;

export const getSearchPlaylistDetailsIsLoading = createSelector(
    searchPlaylistData,
    data => data.isLoading
);

export const getSearchPlaylistDetails = createSelector(
    searchPlaylistData,
    data => data.data?.data?.data
);

export const getSearchPlaylistDetailsError = createSelector(
    searchPlaylistData,
    data => data.error
);
