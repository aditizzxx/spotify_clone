import { connect } from "react-redux";
import Individual from "./view";
import { getConfirmSubscriptionDetails, getCountryDetails, getInstituteDetails, getUserSubscriptionDetails } from "src/store/selectors";
import { fetchConfirmSubscriptionDetailsWatcher, fetchCountryDetailsWatcher, fetchInstituteDetailsWatcher, fetchUserSubscriptionDetailsWatcher } from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    UserSubscriptionData: getUserSubscriptionDetails(state),
    InstituteData: getInstituteDetails(state),
    ConfirmSubscriptionData: getConfirmSubscriptionDetails(state),
    CountryData: getCountryDetails(state)
  };
};

const mapDispatchToProps = {
  fetchUserSubscriptionDetailsWatcher,
  fetchInstituteDetailsWatcher,
  fetchConfirmSubscriptionDetailsWatcher,
  fetchCountryDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Individual);
