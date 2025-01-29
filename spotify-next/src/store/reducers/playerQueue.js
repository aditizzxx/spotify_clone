import * as actionTypes from "../actionTypes";

const initialState = {
  list: [],
  current: 0,
  currentId: "",
  playlist_id: ""
};

export const playerQueueDetailsReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.REPLACE_QUEUE_DETAILS_WATCHER:
      // console.log("action.payload =======================");
      // console.log(action.payload);
      console.log(action.payload?.id[0] , state.list[0]?.id , action.payload?.id);
      // console.log("action.payload =======================");
      
      const xyz = Array.isArray(action.payload.i) ? action.payload.id[0] : action.payload.id
      localStorage.setItem('lastPlayed', JSON.stringify({song_id: xyz || state.list[0].id , playlist : action.payload.playlist_id || state.playlist_id , playlist_index : action.payload.i || 0}));
      // localStorage.setItem('lastPlayedSong', JSON.stringify({id: action.payload.id || state.list[0].id}));
      // localStorage.setItem('lastPlayedPlaylist', JSON.stringify({id : action.payload.playlist_id || state.playlist_id}));

      return {
        ...state,
        // ...action.payload,
        list: action.payload,
        current: action.payload.i || 0,
        currentId: action.payload.id || state.list[0].id,
        playlist_id: action.payload.playlist_id || state.playlist_id
      };
      case actionTypes.CHANGE_CURRENT_SONG_WATCHER:
        return {
          ...state,
          // list: null,
          current: action.payload.i,
          currentId: action.payload.id,
        };
      case actionTypes.SET_NEXT_SONG_WATCHER:
        console.log(state);
      return {
        ...state,
        // current: state.current === 0 ? 1 : state.current + 1,
        current: state.list.songs.length - 1 === state.current ? 0 : state.current + 1,
        currentId: state.list.songs.length - 1 === state.current ? state.list.songs[state.current]._id : state.list.songs[state.current + 1]._id,
      }
    case actionTypes.SET_PREVIOUS_SONG_WATCHER:
      return {
        ...state,
        current: 0 === state.current ? state.list.songs.length - 1 : state.current - 1,
        currentId: 0 === state.current ? state.list.songs[state.current]._id : state.list.songs[state.current - 1]._id
      }
    default:
      return state;
  }
};
