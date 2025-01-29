import { connect } from "react-redux";
import Profile from "./view";
import { getApproveRequestDetails, getArtistRole, getUpdatePassword, getUpdatePasswordError, getUpdateUser } from "src/store/selectors";
import { fetchArtistRoleWatcher, fetchUpdatePasswordWatcher, fetchUpdateUserWatcher } from "src/store/actions";
import { getUserDetails } from "src/store/selectors/userDetails";
import { fetchUserDetailsWatcher } from "src/store/actions/userDetails";

const mapStateToProps = (state) => {
  return {
    UpdatePasswordData : getUpdatePassword(state),
    UpdatePasswordError: getUpdatePasswordError(state),
    UpdateUserInfoData: getUpdateUser(state),
    UserData: getUserDetails(state),
    BecomeArtist: getArtistRole(state),
    ApproveRequestData: getApproveRequestDetails(state),
  };
};

const mapDispatchToProps = {
    fetchUpdatePasswordWatcher,
    fetchUpdateUserWatcher,
    fetchUserDetailsWatcher,
    fetchArtistRoleWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
