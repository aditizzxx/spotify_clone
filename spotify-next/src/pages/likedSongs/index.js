import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import { getAddToPlaylist, getCreateSong, getDeleteSong, getDislikeSong, getLikeSong, getPlayPauseDetails, getPlayerQueueCurrentIdDetails, getSongDetails, getUpdateSong, getViewSong, selectViewPlaylist_Data } from "src/store/selectors";
import { fetchCreateSongWatcher, fetchDeleteSongWatcher, fetchDislikeSongWatcher, fetchLikeSongWatcher, fetchUpdateSongWatcher, fetchViewSongsWatcher, resetfetchCreateSongDetailsWatcher, resetfetchViewSongsDetailsWatcher, fetchViewPlaylistsDetailsWatcher, fetchCurrentSongDetailsWatcher, replaceQueueDetailsWatcher, fetchSongDetailsWatcher, fetchPlayerDetailsWatcher, fetchAddToPlaylistWatcher } from "src/store/actions";
import LikedSongs from "./view";

const mapStateToProps = (state) => {
  return {
    UserData: getUserDetails(state),
    CreateSongData: getCreateSong(state),
    ViewSongData: getViewSong(state),
    LikeSongData: getLikeSong(state),
    DislikeSongData: getDislikeSong(state),
    UpdateSongData: getUpdateSong(state),
    DeleteSongData: getDeleteSong(state),
    CurrentIdData: getPlayerQueueCurrentIdDetails(state),
    SongDetails: getSongDetails(state),
    AddToPlaylistData: getAddToPlaylist(state),
    PlayPauseData: getPlayPauseDetails(state),
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
    fetchAddToPlaylistWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongs);
