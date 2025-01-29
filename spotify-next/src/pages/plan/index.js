import { connect } from "react-redux";
import Plans from "./view";
import { getCreatePlanDetails, getDeletePlanDetails, getEditPlanDetails, getPlanDetails, getViewPlanDetails } from "src/store/selectors";
import { fetchCreatePlanDetailsWatcher, fetchDeletePlanDetailsWatcher, fetchEditPlanDetailsWatcher, fetchPlanDetailsWatcher, fetchViewPlanDetailsWatcher } from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    CreatePlanData: getCreatePlanDetails(state),
    ViewPlanData: getViewPlanDetails(state),
    EditPlanData: getEditPlanDetails(state),
    PlanData: getPlanDetails(state),
    DeletePlanData: getDeletePlanDetails(state),
  };
};

const mapDispatchToProps = {
    fetchCreatePlanDetailsWatcher,
    fetchViewPlanDetailsWatcher,
    fetchEditPlanDetailsWatcher,
    fetchPlanDetailsWatcher,
    fetchDeletePlanDetailsWatcher,
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
