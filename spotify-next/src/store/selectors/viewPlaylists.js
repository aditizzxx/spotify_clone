import { createSelector } from 'reselect';

const selectViewPlaylistData = state => state.viewPlaylist;

export const selectViewPlaylist_isLoading = createSelector(
    selectViewPlaylistData,
    data => data.isLoading
);

export const selectViewPlaylist_Data = createSelector(
    selectViewPlaylistData,
    data => data.data?.data?.data?.playlists
);

export const selectViewPlaylist_Error = createSelector(
    selectViewPlaylistData,
    data => data.error
);
