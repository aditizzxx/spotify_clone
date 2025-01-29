import PlanDetails from "../models/planDetails.js";

export const CreatePlan = async (req, res) => {
  const { formData } = req.body;
  try {
    const plan = new PlanDetails({
      planType: formData.planType,
      startDate: formData.startDate,
      endDate: formData.endDate,
    });
    const planData = await plan.save();

    return res.status(200).json({
      planData,
      message: "Plan Created successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "plan not created!" });
  }
};

export const ViewPlan = async (req, res) => {
  try {
    const planData = await PlanDetails.find({});

    return res.status(200).json({ planData });
  } catch (error) {
    console.log(error);
  }
};

export const EditPlan = async (req, res) => {
  const { formData } = req.body;
  try {
    const planData = await PlanDetails.findOneAndUpdate(
      { _id: formData.id },
      {
        $set: {
          planType: formData.planType,
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
      }
    );

    return res
      .status(200)
      .json({ planData, message: "plan updated successfully!" });
  } catch (error) {
    console.log(error);
  }
};

export const getPlan = async (req,res) => {
    // console.log(req.params);
    const {id} = req.params;
    try{
        const getPlan = await PlanDetails.find({_id: id});
        const result = getPlan.length > 0 ? getPlan[0] : null
        return res.status(200).json({result,message: "success"});
    }catch(error){
        console.log(error);
    }
}

export const DeletePlan = async(req,res) => {
    const {id} = req.body;
    try{
        const deletePlan = await PlanDetails.findByIdAndDelete({_id: id})
        return res.status(200).json({deletePlan,message: "plan deleted Successfully!"})
    }catch(error){
        console.log(error);
    }
}