import { createSelector } from 'reselect';

const selectPlayerQueueData = state => state.playerQueue;

export const getPlayerQueueDetailsList = createSelector(
    selectPlayerQueueData,
    data => data.list
);

export const getPlayerQueueDetails = createSelector(
    selectPlayerQueueData,
    data => data.current
);

export const getPlayerQueueCurrentIdDetails = createSelector(
    selectPlayerQueueData,
    data => data.currentId
);
