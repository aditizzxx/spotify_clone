import Stripe from "stripe";
import Subscription from "../models/subscriptions.js";
import User from "../models/users.js";

export const StudentDetails = async (req, res) => {
  const { formData, plan, user } = req.body;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2020-08-27",
      });
    let planType;
    if (plan.includes("student")) {
      planType = "student";
    } else if (plan.includes("family")) {
      planType = "family";
    } else if (plan.includes("individual")) {
      planType = "individual";
    } else {
      planType = "free";
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 2);

    const subscriptionData = {
      name: formData.name,
      email: formData.email,
      country: formData.country,
      institute: formData.institute,
      DOB: new Date(formData.date),
      user: user,
      planType,
      startDate,
      endDate,
      verified: planType === "student" ? true : false,
    };

    let amount;
    if (planType === "student") {
      amount = 59 * 100;
    } else if (planType === "family") {
      amount = 179 * 100;
    } else if (planType === "individual") {
      amount = 119 * 100;
    } else {
      amount = 0;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      metadata: { ...subscriptionData },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      subscriptionData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "userSubscription details not saved yet!" });
  }
};

export const ConfirmSubscription = async (req, res) => {
  const { paymentIntentId, subscriptionData } = req.body;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2020-08-27",
      });
    // Confirm the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Save the subscription data to the database
      const subscription = new Subscription(subscriptionData);
      await subscription.save();

      // Update user with subscription reference
      await User.findByIdAndUpdate(subscriptionData.user, {
        subscriptionId: subscription._id,
      });

      return res.status(200).json({
          message: "Subscription confirmed and saved successfully",
          subscription,
        });
    } else {
      return res.status(400).json({ error: "Payment not successful" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
