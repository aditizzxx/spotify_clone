import { connect } from "react-redux";
import HomePage from "./view";
import { fetchCreatePlaylistWatcher, fetchCurrentSongDetailsWatcher, fetchPlayerDetailsWatcher, fetchSongDetailsWatcher, fetchViewSongsWatcher, replaceQueueDetailsWatcher } from "src/store/actions";
import { getCreatePlaylist, getViewSong, getViewSongIsLoading, getUserDetails } from "src/store/selectors";

const mapStateToProps = (state) => {
    return {
      UserData: getUserDetails(state),
      SongData: getViewSong(state),
      SongDetailsIsLoading: getViewSongIsLoading(state),
    }
};

const mapDispatchToProps = {
    fetchCreatePlaylistWatcher,
    fetchViewSongsWatcher,
    replaceQueueDetailsWatcher,
    fetchCurrentSongDetailsWatcher,
    fetchSongDetailsWatcher,
    fetchPlayerDetailsWatcher,
}

export default connect(mapStateToProps , mapDispatchToProps)(HomePage)