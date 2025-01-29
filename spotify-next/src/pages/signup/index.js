import { connect } from "react-redux";
import SignUp from "./view";
import { getSignupDetails } from "src/store/selectors";
import { fetchSignupDetailsWatcher  } from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    SignUpData: getSignupDetails(state),
  };
};

const mapDispatchToProps = {
  fetchSignupDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
