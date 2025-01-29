import { connect } from "react-redux";
import { fetchApproveRequestDetailsWatcher, fetchDisApproveRequestDetailsWatcher, fetchUserRoleDetailsAction } from "src/store/actions";
import Listeners from "./view";
import { getApproveRequestDetails, getDisApproveRequestDetails, getUserRoleDetails } from "src/store/selectors";

const mapStateToProps = (state) => {
    return {
        ListenerData: getUserRoleDetails(state),
        ApproveRequestData: getApproveRequestDetails(state),
        DisApproveRequestData: getDisApproveRequestDetails(state),

    };
};


const mapDispatchToProps = {
    fetchUserRoleDetailsAction,
    fetchApproveRequestDetailsWatcher,
    fetchDisApproveRequestDetailsWatcher
};

export default connect(mapStateToProps, mapDispatchToProps)(Listeners);