import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import Admin from "./view";
import { getCreateSong, getDeleteSong, getDislikeSong, getLikeSong, getPlayerQueueCurrentIdDetails, getSongDetails, getUpdateSong, getViewSong, selectViewPlaylist_Data } from "src/store/selectors";
import { fetchCreateSongWatcher, fetchDeleteSongWatcher, fetchDislikeSongWatcher, fetchLikeSongWatcher, fetchUpdateSongWatcher, fetchViewSongsWatcher, resetfetchCreateSongDetailsWatcher, resetfetchViewSongsDetailsWatcher, fetchViewPlaylistsDetailsWatcher, fetchCurrentSongDetailsWatcher, replaceQueueDetailsWatcher, fetchSongDetailsWatcher, fetchPlayerDetailsWatcher } from "src/store/actions";

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
