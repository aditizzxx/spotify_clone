import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import {
  getCreateSong,
  getDeleteSong,
  getDislikeSong,
  getLikeSong,
  getPlayerQueueCurrentIdDetails,
  getResetPasswordDetails,
  getSongDetails,
  getUpdateSong,
  getViewSong,
  selectViewPlaylist_Data,
} from "src/store/selectors";
import {
  fetchCreateSongWatcher,
  fetchDeleteSongWatcher,
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchUpdateSongWatcher,
  fetchViewSongsWatcher,
  resetfetchCreateSongDetailsWatcher,
  resetfetchViewSongsDetailsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchResetPasswordDetailsWatcher,
} from "src/store/actions";
import ResetPassword from "./view";

const mapStateToProps = (state) => {
  return {
    UserData: getUserDetails(state),
    CreateSongData: getCreateSong(state),
    ViewSongData: getViewSong(state),
    LikeSongData: getLikeSong(state),
    DislikeSongData: getDislikeSong(state),
    ViewPlaylistData: selectViewPlaylist_Data(state),
    UpdateSongData: getUpdateSong(state),
    DeleteSongData: getDeleteSong(state),
    CurrentIdData: getPlayerQueueCurrentIdDetails(state),
    SongDetails: getSongDetails(state),
    ResetPasswordData: getResetPasswordDetails(state),
  };
};

const mapDispatchToProps = {
  fetchUserDetailsWatcher,
  fetchCreateSongWatcher,
  fetchViewSongsWatcher,
  resetfetchCreateSongDetailsWatcher,
  resetfetchViewSongsDetailsWatcher,
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchUpdateSongWatcher,
  fetchDeleteSongWatcher,
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchResetPasswordDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
