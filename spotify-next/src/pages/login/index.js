import { connect } from "react-redux";
import Login from "./view";
import { login_Data, login_Error } from "src/store/selectors/login";
import { fetchLoginAction } from "src/store/actions";

const mapStateToProps = (state) => {
    return {
        LoginDetails: login_Data(state),
        LoginError: login_Error(state),
    };
};


const mapDispatchToProps = {
    fetchLoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);