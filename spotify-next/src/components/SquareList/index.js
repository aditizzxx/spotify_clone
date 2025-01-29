import { connect } from "react-redux";
import {
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
} from "src/store/actions";
import SquareList from "./view";

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  fetchPlayerDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareList);
