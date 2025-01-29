import { connect } from "react-redux";
import Playlist from "./view";
import {
  getDeletePlaylist,
  getDislikeSong,
  getEditPlaylist,
  getLikeSong,
  getLikedPlaylist,
  getPlaylistDetails,
  getRemoveFromPlaylist,
  getdislikedPlaylist,
  getUserDetails,
} from "src/store/selectors";
import {
  fetchCurrentSongDetailsWatcher,
  fetchDeletePlaylistWatcher,
  fetchDislikeSongWatcher,
  fetchDislikedPlaylistWatcher,
  fetchEditPlaylistWatcher,
  fetchLikeSongWatcher,
  fetchLikedPlaylistWatcher,
  fetchPlayerDetailsWatcher,
  fetchPlaylistDetailsWatcher,
  fetchRemoveFromPlaylistWatcher,
  fetchSongDetailsWatcher,
  fetchUserDetailsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  replaceQueueDetailsWatcher,
  resetfetchEditPlaylistDetailsWatcher,
  resetfetchUserDetailsWatcher
} from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    PlaylistData: getPlaylistDetails(state),
    UpdatePlaylistData: getEditPlaylist(state),
    DeletePlaylistData: getDeletePlaylist(state),
    LikedPlaylistData: getLikedPlaylist(state),
    DislikedPlaylistData: getdislikedPlaylist(state),
    UserData: getUserDetails(state),
    RemoveFromPlaylistData: getRemoveFromPlaylist(state),
    LikeSongData: getLikeSong(state),
    DislikeSongData: getDislikeSong(state),
  };
};

const mapDispatchToProps = {
  fetchPlaylistDetailsWatcher,
  fetchEditPlaylistWatcher,
  resetfetchEditPlaylistDetailsWatcher,
  fetchDeletePlaylistWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchLikedPlaylistWatcher,
  fetchDislikedPlaylistWatcher,
  fetchUserDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchRemoveFromPlaylistWatcher,
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchCurrentSongDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  resetfetchUserDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
