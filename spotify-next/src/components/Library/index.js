import { connect } from "react-redux";
import {
  fetchCreatePlaylistWatcher,
  fetchViewPlaylistsDetailsWatcher,
  resetfetchCreatePlaylistDetailsWatcher,
  resetfetchDeletePlaylistDetailsWatcher,
} 
from "src/store/actions";
import {
  getCreatePlaylist,
  getDeletePlaylist,
  getEditPlaylist,
  selectViewPlaylist_Data,
  selectViewPlaylist_isLoading,
} from "src/store/selectors";
import Library from "./view";

const mapStateToProps = (state) => {
  return {
    ViewPlaylistData: selectViewPlaylist_Data(state),
    CreatePlaylistData: getCreatePlaylist(state),
    DeletePlaylistData: getDeletePlaylist(state),
    PlaylistDataIsLoading: selectViewPlaylist_isLoading(state),
    UpdatePlaylistData: getEditPlaylist(state),
  };
};

const mapDispatchToProps = {
  fetchCreatePlaylistWatcher,
  resetfetchCreatePlaylistDetailsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  resetfetchDeletePlaylistDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);