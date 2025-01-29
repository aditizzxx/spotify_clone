import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";
import Search from "./view";
import {
  fetchViewArtistDetailsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  fetchViewSongsWatcher,
} from "src/store/actions";
import {
  getAddToPlaylist,
  getDislikeSong,
  getLikeSong,
  getPlayerQueueCurrentIdDetails,
  getSearchArtistDetails,
  getSearchPlaylistDetails,
  getSearchSongDetails,
  getSongDetails,
  getViewArtistDetails,
  getViewSong,
  selectViewPlaylist_Data,
} from "src/store/selectors";

const mapStateToProps = (state) => {
  return {
    ViewPlaylistData: selectViewPlaylist_Data(state),
    SongData: getViewSong(state),
    SongDetails: getSongDetails(state),
    ArtistData: getViewArtistDetails(state),
  };
};

const mapDispatchToProps = {
  fetchViewPlaylistsDetailsWatcher,
  fetchViewSongsWatcher,
  fetchViewArtistDetailsWatcher
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
