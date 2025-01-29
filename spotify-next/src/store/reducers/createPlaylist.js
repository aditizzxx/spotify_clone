import * as actionTypes from "../actionTypes";

const initialState = {
    createPlaylist: {
        isLoading: false,
        data: null,
        error: null,
    },
    // selectedCreateRole: [],
};

export const createPlaylistReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case actionTypes.RESET_FETCH_CREATE_PLAYLIST_DETAILS_WATCHER:
            return initialState;
        case actionTypes.FETCH_CREATE_PLAYLIST_WATCHER:
            return {
                ...state,
                createPlaylist: {
                    isLoading: true,
                    data: null,
                    error: null
                },
            };
            case actionTypes.SET_CREATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                createPlaylist: {
                    isLoading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case actionTypes.SET_CREATE_PLAYLIST_FAILURE:
            return {
                ...state,
                createPlaylist: {
                    isLoading: false,
                    data: null,
                    error: action.payload,
                },
            };
            
        default:
            return state;
    }
};
