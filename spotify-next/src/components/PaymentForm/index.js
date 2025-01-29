import { connect } from "react-redux";
import { getConfirmSubscriptionDetails, getInstituteDetails, getUserSubscriptionDetails } from "src/store/selectors";
import { fetchConfirmSubscriptionDetailsWatcher, fetchInstituteDetailsWatcher, fetchUserSubscriptionDetailsWatcher } from "src/store/actions";
import PaymentForm from "./view";

const mapStateToProps = (state) => {
  return {
    UserSubscriptionData: getUserSubscriptionDetails(state),
    InstituteData: getInstituteDetails(state),
    ConfirmSubscriptionData: getConfirmSubscriptionDetails(state),
  };
};

const mapDispatchToProps = {
    fetchUserSubscriptionDetailsWatcher,
    fetchInstituteDetailsWatcher,
    fetchConfirmSubscriptionDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
