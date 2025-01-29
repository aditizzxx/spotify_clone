import { Router } from "express";
import { CreatePlan, DeletePlan, EditPlan, ViewPlan, getPlan } from "../controllers/planDetailsController.js";
const router = Router();


router.post('/createPlan', CreatePlan);
router.post('/plan', ViewPlan);
router.put('/editPlan', EditPlan);
router.get('/getPlan/:id', getPlan);
router.delete('/deletePlan', DeletePlan);

export default router;
