import Link from "next/link";
import Navbar from "src/components/Navbar";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PaymentForm from "src/components/PaymentForm/view";
import Button from "src/components/UI/Button";
import Select from 'react-select';

const stripePromise = loadStripe("pk_test_ThPYZk16YvoGfuyKJMUvtm2n");

const Individual =({
    UserSubscriptionData,
    fetchUserSubscriptionDetailsWatcher,
    ConfirmSubscriptionData,
    fetchConfirmSubscriptionDetailsWatcher,
    CountryData,
    fetchCountryDetailsWatcher
  }) => {
    const session = useSession();
    const user = session?.data?.user?.id;
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [clientSecret, setClientSecret] = useState("");
    const [subscriptionData, setSubscriptionData] = useState(null);
  
    const router = useRouter();
    const plan = router.pathname;
  
  
    useEffect(()=>{
      fetchCountryDetailsWatcher();
    },[fetchCountryDetailsWatcher])

    
    const uniqueCountryNames = Array.from(new Set(CountryData?.map((data) => data?.country)));
  
    const countryName = uniqueCountryNames.map((country) => ({
      value: country,
      label: country,
    }));
  
    const studentDetailsHandler = (e) => {
      e.preventDefault();
      const form = document.getElementById("familyPremium");
      const fd = new FormData(form);
      const formData = { ...Object.fromEntries(fd) };
      fetchUserSubscriptionDetailsWatcher({ formData, plan, user });
    //   resetfetchUserSubscriptionDetailsWatcher();
      // setClientSecret(UserSubscriptionData?.data?.clientSecret);
      // setSubscriptionData(UserSubscriptionData?.data?.subscriptionData);
    };
  
    useEffect(()=>{
      if(UserSubscriptionData?.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Verification Successful',
          text: 'Your student details have been verified successfully.',
      }).then((result)=>{
        if(result.isConfirmed){
        //   resetfetchUserSubscriptionDetailsWatcher();
          setClientSecret(UserSubscriptionData?.data?.clientSecret);
          setSubscriptionData(UserSubscriptionData?.data?.subscriptionData);
        }
      });
    }
  },[UserSubscriptionData])
  
    const CountryDataHandler = (selectedOption) => {
      setSelectedCountry(selectedOption);
    };
    return(
        <>
        <Navbar/>
        <div className="container">

            <div className="family-header">
                <section className="family-premium">
                    <article className="family-article mt-5">
                        <div className="title">
                            <p>You choose</p>
                            <Link href="/premium">Change Plan</Link>
                        </div>
                        <article className="plandetail-article">
                            <div className="plan-title" style={{ background:"rgb(255, 210, 215)" }}>
                                <h2 className="">Premium Individual</h2>
                                <p className="fs-5">1 accounts</p>
                            </div>
                            <p className="p-4"> Open only to users who haven’t already tried Premium.</p>
                        </article>
                    </article>
                </section>
            </div>
            <div style={{ maxWidth:"580px", margin:"auto" }}>
                <section className="subscribe">
                    <article className="subscribe-article">
                        <div className="subscribe-header">
                            <h2>Subscribe</h2>
                            <p className="fs-4">Auto-renews monthly; cancel online anytime.</p>
                        </div>
                        <ul className="p-0">
                            <li className="subscribe-list">
                                <div className="details">
                                    <span style={{ background:"rgb(255, 210, 215)" }}>12 months for ₹699</span>
                                    <h2>Special Offer</h2>
                                    <p>₹119/month after offer period</p>
                                </div>
                            </li>
                        </ul>
                    </article>
                </section>
            </div>
            <div className="student-form mb-5">
                <div className="container">
                    <div className="header mb-5 text-center">
                        <h1 className="fw-bold">Subscription Form</h1>
                    </div>
                <div>
                    <form action="" id="familyPremium"
                    onSubmit={studentDetailsHandler}
                    >
                    <div className="mb-3">
                        <label htmlFor="country" className="mb-3 fw-bold fs-4">Country</label>
                        <Select
                        options={countryName}
                        onChange={CountryDataHandler}
                        value={selectedCountry}
                        name="country"
                        id="country"
                        isSearchable
                        placeholder="Select Country"
                        className="from-check-input fs-4"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="mb-3 fw-bold fs-4"> Name </label>
                        <input
                        name="name"
                        type="text"
                        className="form-control form-control-lg fs-4"
                        placeholder="Enter Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="mb-3 fw-bold fs-4">
                        Email address
                        </label>
                        <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg fs-4"
                        placeholder="Enter Email Address"
                        id="exampleInputEmail1"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="DOB" className="mb-3 fw-bold fs-4">
                        Date of birth
                        </label>
                        <input
                        name="date"
                        type="date"
                        className="form-control form-control-lg fs-4"
                        />
                    </div>

                    <label htmlFor="Mobile-number" className="mb-3 fw-bold fs-4">
                        Mobile Number
                    </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">+91</span>
                        <input
                        type="number"
                        className="form-control form-control-lg fs-4"
                        placeholder="Mobile Number"
                        aria-label="Mobile Number"
                        aria-describedby="basic-addon1"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="next-btn mb-5"
                        styles={{
                            padding: "1rem 2rem",
                            display: "flex",
                            fontSize: "1.6rem",
                            fontWeight: "600",
                            textAlign: "center",
                            color: "#000",
                            background: "rgb(255, 210, 215)",
                            border: "none",
                            borderRadius: "5rem",
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                    >
                        NEXT
                    </Button>
                    </form>
                </div>
                {clientSecret && subscriptionData && (
                    <Elements stripe={stripePromise}>
                    <PaymentForm
                        clientSecret={clientSecret}
                        subscriptionData={subscriptionData}
                        fetchConfirmSubscriptionDetailsWatcher={fetchConfirmSubscriptionDetailsWatcher}
                        ConfirmSubscriptionData={ConfirmSubscriptionData}
                    />
                    </Elements>
                )}
                </div>
            </div>
            </div>
        </>
    )
}

export default Individual;