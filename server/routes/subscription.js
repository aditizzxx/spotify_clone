// import { Router } from "express";
// import { StudentDetails } from "../controllers/subscriptionController.js";
// const router = Router();

// router.post('/student',StudentDetails);

// export default router;


import express from 'express';
import { ConfirmSubscription, StudentDetails } from "../controllers/subscriptionController.js";
import stripePackage from 'stripe';

// const subscriptionRoutes = () => {
    const router = express.Router();
//     const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

//     // const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// // app.use('/', subscriptionRoutes(stripe));

//     // Define your routes here
// };

// export default subscriptionRoutes;
router.post('/student', StudentDetails);
router.post('/confirm-subscription', ConfirmSubscription);

export default  router;
