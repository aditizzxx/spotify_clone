import { connect } from "react-redux";
import Student from "./view";
import { getConfirmSubscriptionDetails, getCountryDetails, getInstituteDetails, getUserSubscriptionDetails } from "src/store/selectors";
import { fetchConfirmSubscriptionDetailsWatcher, fetchCountryDetailsWatcher, fetchInstituteDetailsWatcher, fetchUserSubscriptionDetailsWatcher, resetfetchConfirmSubscriptionDetailsWatcher, resetfetchUserSubscriptionDetailsWatcher } from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    UserSubscriptionData: getUserSubscriptionDetails(state),
    InstituteData: getInstituteDetails(state),
    ConfirmSubscriptionData: getConfirmSubscriptionDetails(state),
    CountryData: getCountryDetails(state),
  };
};

const mapDispatchToProps = {
    fetchUserSubscriptionDetailsWatcher,
    fetchInstituteDetailsWatcher,
    fetchConfirmSubscriptionDetailsWatcher,
    resetfetchConfirmSubscriptionDetailsWatcher,
    resetfetchUserSubscriptionDetailsWatcher,
    fetchCountryDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
