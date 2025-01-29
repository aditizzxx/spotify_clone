import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import {
  getAddToPlaylist,
  getDislikeSong,
  getLikeSong,
  getPlayPauseDetails,
  getPlayerQueueCurrentIdDetails,
  getPlayerQueueDetails,
  getPlayerQueueDetailsList,
  getRemoveFromPlaylist,
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
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchAddToPlaylistWatcher,
  fetchRemoveFromPlaylistWatcher,
  fetchPlaylistDetailsWatcher,
  resetfetchAddToPlaylistDetailsWatcher,
  resetfetchUserDetailsWatcher,
} from "src/store/actions";
import List from "./view";

const mapStateToProps = (state) => {
  return {
    ViewPlaylistData: selectViewPlaylist_Data(state),
    LikeSongData: getLikeSong(state),
    DislikeSongData: getDislikeSong(state),
    UserData: getUserDetails(state),
    ViewSongData: getViewSong(state),
    PlayPauseData: getPlayPauseDetails(state),
    currentIndex: getPlayerQueueDetails(state),
    queue: getPlayerQueueDetailsList(state),
    CurrentId: getPlayerQueueCurrentIdDetails(state),
    AddToPlaylistData: getAddToPlaylist(state),
    RemoveFromPlaylistData: getRemoveFromPlaylist(state),
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
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchAddToPlaylistWatcher,
  fetchRemoveFromPlaylistWatcher,
  fetchPlaylistDetailsWatcher,
  resetfetchAddToPlaylistDetailsWatcher,
  resetfetchUserDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
