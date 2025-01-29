import { connect } from "react-redux";
import { getUserDetails } from "src/store/selectors/userDetails";

import {
  fetchArtistRoleWatcher,
} from "src/store/actions";
import MainLayout from "./view";

const mapStateToProps = (state) => {
  return {
    UserData: getUserDetails(state),
  };
};

const mapDispatchToProps = {
  fetchArtistRoleWatcher
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
