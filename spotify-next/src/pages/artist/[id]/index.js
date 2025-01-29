import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import Artist from "./view";
import {
  getArtistDetails,
  getCreateSong,
  getDeleteSong,
  getDislikeSong,
  getFollowArtistDetails,
  getLikeSong,
  getPlayPauseDetails,
  getPlayerQueueCurrentIdDetails,
  getPlayerQueueDetails,
  getPlayerQueueDetailsList,
  getSongDetails,
  getUnfollowArtistDetails,
  getUpdateSong,
  getViewSong,
  selectViewPlaylist_Data,
} from "src/store/selectors";
import {
  fetchArtistDetailsWatcher,
  fetchCreateSongWatcher,
  fetchCurrentSongDetailsWatcher,
  fetchDeleteSongWatcher,
  fetchDislikeSongWatcher,
  fetchFollowArtistDetailsWatcher,
  fetchLikeSongWatcher,
  fetchPlayerDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchUnfollowArtistDetailsWatcher,
  fetchUpdateSongWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchViewSongsWatcher,
  replaceQueueDetailsWatcher,
} from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    UserData: getUserDetails(state),
    ArtistData: getArtistDetails(state),
    LikeSongData: getLikeSong(state),
    DislikeSongData: getDislikeSong(state),
    CurrentIdData: getPlayerQueueCurrentIdDetails(state),
    SongDetails: getSongDetails(state),
    CreateSongData: getCreateSong(state),
    ViewSongData: getViewSong(state),
    ViewPlaylistData: selectViewPlaylist_Data(state),
    UpdateSongData: getUpdateSong(state),
    DeleteSongData: getDeleteSong(state),
    PlayPauseData: getPlayPauseDetails(state),
    currentIndex: getPlayerQueueDetails(state),
    queue: getPlayerQueueDetailsList(state),
    FollowArtistData: getFollowArtistDetails(state),
    UnfollowArtistData: getUnfollowArtistDetails(state),
  };
};

const mapDispatchToProps = {
  fetchUserDetailsWatcher,
  fetchArtistDetailsWatcher,
  fetchCreateSongWatcher,
  fetchViewSongsWatcher,
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchUpdateSongWatcher,
  fetchDeleteSongWatcher,
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchFollowArtistDetailsWatcher,
  fetchUnfollowArtistDetailsWatcher
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
