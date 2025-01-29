import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import ModalWrapper from "src/components/UI/ModalWrapper";

const Plans = ({
  CreatePlanData,
  fetchCreatePlanDetailsWatcher,
  ViewPlanData,
  fetchViewPlanDetailsWatcher,
  EditPlanData,
  fetchEditPlanDetailsWatcher,
  PlanData,
  fetchPlanDetailsWatcher,
  DeletePlanData,
  fetchDeletePlanDetailsWatcher
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [HandleEdit, setHandleEdit] = useState(null);

  useEffect(() => {
    fetchViewPlanDetailsWatcher();
  }, [DeletePlanData,EditPlanData]);

  const HandleOpenCreatePlanModal = () => {
    setCreateModalOpen(true);
  };
  const HandleCloseCreatePlanModal = () => {
    setCreateModalOpen(false);
  };
  const HandleOpenEditPlanModal = (plan) => {
    setHandleEdit(plan._id);
    fetchPlanDetailsWatcher({ id: plan._id });
    setEditModalOpen(true);
  };
  const HandleCloseEditPlanModal = () => {
    setEditModalOpen(false);
  };

  const createPlanformSubmitHandler = async (e) => {
    e.preventDefault();
    const form = document.getElementById("createPlanForm");
    const fd = new FormData(form);
    const formData = Object.fromEntries(fd);
    fetchCreatePlanDetailsWatcher({ formData });
    HandleCloseCreatePlanModal();
  };

  const editPlanformSubmitHandler = async (id) => {
    const form = document.getElementById("editPlanForm");
    const fd = new FormData(form);
    const formData = { ...Object.fromEntries(fd), id };
    fetchEditPlanDetailsWatcher({ formData });
  };

  const EditSubmitHandle = (e) => {
    e.preventDefault();
    editPlanformSubmitHandler(HandleEdit);
    HandleCloseEditPlanModal();
  };

  const HandleDeletePlan = (id) => {
    fetchDeletePlanDetailsWatcher({id});
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="playlist likedSongs">
        <div className="playlist__header">
          <div>
            <h1 className="playlist__name">Premium Plans</h1>
            <div className="playlist__user">
              <span> You have {ViewPlanData?.planData.length} plans</span>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Plan Type</th>
              <th>Plan StartDate</th>
              <th>Plan EndDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ViewPlanData?.planData.map((plan, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{plan.planType}</td>
                <td>{formatDate(plan.startDate)}</td>
                <td>{formatDate(plan.endDate)}</td>
                <td>
                  <FaPlus onClick={HandleOpenCreatePlanModal} />{" "}
                  <FaEdit onClick={() => HandleOpenEditPlanModal(plan)} />{" "}
                  <MdDelete onClick={() => HandleDeletePlan(plan._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalWrapper
        heading="Create plan"
        open={createModalOpen}
        handleClose={HandleCloseCreatePlanModal}
      >
        <form id="createPlanForm" onSubmit={createPlanformSubmitHandler}>
          <label htmlFor="PlanType">Plan Type</label>
          <Input
            id="planType"
            type="text"
            name="planType"
            placeholder="Plan Type"
          />

          <label htmlFor="startDate">Start Date</label>
          <Input type="date" name="startDate" id="startDate" />

          <label htmlFor="endDate">End Date</label>
          <Input type="date" name="endDate" id="endDate" />

          <Button type="submit" color="white" fullWidth={true}>
            Create
          </Button>
        </form>
      </ModalWrapper>

      <ModalWrapper
        heading="Edit plan"
        open={editModalOpen}
        handleClose={HandleCloseEditPlanModal}
      >
        {PlanData?.result && (
          <form id="editPlanForm" onSubmit={EditSubmitHandle}>
            <label htmlFor="PlanType">Plan Type</label>
            <Input
              id="planType"
              type="text"
              name="planType"
              placeholder="Plan Type"
              defaultValue={PlanData?.result?.planType}
            />

            <label htmlFor="startDate">Start Date</label>
            <Input type="date" name="startDate" id="startDate"  defaultValue={formatDateForInput(PlanData?.result?.startDate)}/>

            <label htmlFor="endDate">End Date</label>
            <Input type="date" name="endDate" id="endDate"  defaultValue={formatDateForInput(PlanData?.result?.endDate)} />

            <Button type="submit" color="white" fullWidth={true}>
              Update
            </Button>
          </form>
        )}
      </ModalWrapper>
    </>
  );
};

export default Plans;
