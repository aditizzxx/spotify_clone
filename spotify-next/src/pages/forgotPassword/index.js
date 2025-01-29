import { connect } from "react-redux";
import Forgot from "./view";
import { getForgotPasswordDetails } from "src/store/selectors";
import { fetchForgotPasswordDetailsWatcher } from "src/store/actions";


const mapStateToProps = (state) => {
    return {
        ForgotPasswordData: getForgotPasswordDetails(state),
    };
};


const mapDispatchToProps = {
    fetchForgotPasswordDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);