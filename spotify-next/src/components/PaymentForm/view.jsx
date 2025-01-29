import Image from "next/image";
import stripelogo from "../../img/Stripe-Logo-2009.png";
import { FaLock } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PaymentForm = ({
  clientSecret,
  subscriptionData,
  fetchConfirmSubscriptionDetailsWatcher,
  ConfirmSubscriptionData,
}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      fetchConfirmSubscriptionDetailsWatcher({
        paymentIntentId: paymentIntent.id,
        subscriptionData,
      });
    //   Swal.fire({
    //     icon: "success",
    //     title: "Payment Successful",
    //     text: "Payment successful and student verified!",
    //   });
    }
  };

  useEffect(() => {
    if (ConfirmSubscriptionData?.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Payment successful and student verified!",
      }).then((result)=>{
        if(result.isConfirmed){
            router.push('/');
        }
      });
    }
  }, [ConfirmSubscriptionData]);

  return (
    <div className="payment-form-container">
      <Image
        src={stripelogo}
        alt="Stripe Logo"
        width={100}
        height={60}
        className="stripe-logo"
      />
      <h2>Secure Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      <div className="payment-symbol">
        <FaLock />
        <FaCcVisa />
        <FaCcMastercard />
      </div>
    </div>
  );
};

export default PaymentForm;
