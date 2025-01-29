import * as actionTypes from "../actionTypes";

export const replaceQueueDetailsWatcher = (payload) => ({
    type: actionTypes.REPLACE_QUEUE_DETAILS_WATCHER,
    payload,
});

export const fetchCurrentSongDetailsWatcher = (payload) => ({
    type: actionTypes.CHANGE_CURRENT_SONG_WATCHER,
    payload
});

export const setNextSongWatcher = (payload) => ({
    type: actionTypes.SET_NEXT_SONG_WATCHER,
    payload,
});

export const setPreviousSongWatcher = (payload) => ({
    type: actionTypes.SET_PREVIOUS_SONG_WATCHER,
    payload,
});
