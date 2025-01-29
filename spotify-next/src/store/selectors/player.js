import { createSelector } from 'reselect';

const selectPlayerData = state => state.playPauseDetails;

export const getPlayPauseDetails = createSelector(
    selectPlayerData,
    data => data.isPlaying
);

