import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import {
  getCreatePlaylist,
  getLikeSong,
  getPlayPauseDetails,
  getPlayerQueueDetails,
  getPlayerQueueDetailsList,
  getSongDetails,
  getViewSong,
  selectViewPlaylist_Data,
} from "src/store/selectors";
import {
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchCreatePlaylistWatcher,
  setNextSongWatcher,
  setPreviousSongWatcher,
  fetchViewSongsWatcher,
  replaceQueueDetailsWatcher,
  fetchCurrentSongDetailsWatcher,
} from "src/store/actions";
import Player from "./view";

const mapStateToProps = (state) => {
  return {
    CreatePlaylistData: getCreatePlaylist(state),
    ViewPlaylistData: selectViewPlaylist_Data(state),
    LikeSongData: getLikeSong(state),
    UserData: getUserDetails(state),
    ViewSongData: getViewSong(state),
    PlayPauseData: getPlayPauseDetails(state),
    currentIndex: getPlayerQueueDetails(state),
    queue: getPlayerQueueDetailsList(state),
    SongData: getSongDetails(state),
    
  };
};

const mapDispatchToProps = {
  fetchCreatePlaylistWatcher,
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchPlayerDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchUserDetailsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  setNextSongWatcher,
  setPreviousSongWatcher,
  fetchViewSongsWatcher,
  replaceQueueDetailsWatcher,
  fetchCurrentSongDetailsWatcher
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
