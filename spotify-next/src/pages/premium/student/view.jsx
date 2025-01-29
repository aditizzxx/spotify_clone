import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import Button from "src/components/UI/Button";
import Navbar from "src/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PaymentForm from "src/components/PaymentForm/view";
import Swal from "sweetalert2";


const stripePromise = loadStripe("pk_test_ThPYZk16YvoGfuyKJMUvtm2n");

const Student = ({
  UserSubscriptionData,
  fetchUserSubscriptionDetailsWatcher,
  InstituteData,
  fetchInstituteDetailsWatcher,
  ConfirmSubscriptionData,
  fetchConfirmSubscriptionDetailsWatcher,
  resetfetchConfirmSubscriptionDetailsWatcher,
  resetfetchUserSubscriptionDetailsWatcher,
  CountryData,
  fetchCountryDetailsWatcher
}) => {
  const session = useSession();
  const user = session?.data?.user?.id;
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [subscriptionData, setSubscriptionData] = useState(null);

  const router = useRouter();
  const plan = router.pathname;

  // const country = "india";
  useEffect(() => {
    fetchInstituteDetailsWatcher("india");
  }, [fetchInstituteDetailsWatcher]);

  useEffect(()=>{
    fetchCountryDetailsWatcher();
  },[fetchCountryDetailsWatcher])

  const instituteName = InstituteData?.map((data) => ({
    value: data?.name,
    label: data?.name,
  }));
  
  const uniqueCountryNames = Array.from(new Set(CountryData?.map((data) => data?.country)));

  const countryName = uniqueCountryNames.map((country) => ({
    value: country,
    label: country,
  }));

  const studentDetailsHandler = (e) => {
    e.preventDefault();
    const form = document.getElementById("studentPremium");
    const fd = new FormData(form);
    const formData = { ...Object.fromEntries(fd) };
    fetchUserSubscriptionDetailsWatcher({ formData, plan, user });
    resetfetchUserSubscriptionDetailsWatcher();
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
        resetfetchUserSubscriptionDetailsWatcher();
        setClientSecret(UserSubscriptionData?.data?.clientSecret);
        setSubscriptionData(UserSubscriptionData?.data?.subscriptionData);
      }
    });
  }
},[UserSubscriptionData])

  const CountryDataHandler = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const InstituteDataHandler = (selectedOption) => {
    setSelectedInstitute(selectedOption);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="student-header mb-5">
          <section className="student-verification">
            <h1 className="fw-bold mb-5">Verify you’re a student</h1>
            <p className="mb-0">
              First, we need to check you’re enrolled at an accredited college or
              university.
              <br />
              Not sure if you’re eligible?
            </p>
          </section>
        </div>
        <div className="student-form mb-5">
          <div className="container">
            <div className="header mb-5 text-center">
              <h1 className="fw-bold">Tell us about yourself.</h1>
              <p className="fs-5">
                Enter your name as it appears on your school records. Spotify uses
                StudentID to verify your eligible student status.
              </p>
            </div>
            <div>
              <form action="" id="studentPremium" onSubmit={studentDetailsHandler}>
                <div className="mb-3">
                  <label htmlFor="country" className="mb-3 fw-bold fs-4">
                    Country
                  </label>
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
                  <label htmlFor="institute" className="mb-3 fw-bold fs-4">
                    Educational establishment name
                  </label>
                  <Select
                    options={instituteName}
                    onChange={InstituteDataHandler}
                    value={selectedInstitute}
                    name="institute"
                    id="institute"
                    isSearchable
                    placeholder="Select Institute"
                    className="from-check-input fs-4"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="mb-3 fw-bold fs-4">
                    Name
                  </label>
                  <input name="name" type="text" className="form-control form-control-lg fs-4" placeholder="Enter Name"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="mb-3 fw-bold fs-4">
                    Email address(Preferred Student Email)
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
                  <input name="date" type="date" className="form-control form-control-lg fs-4"/>
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
                    background: "#c4b1d4",
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
  );
};

export default Student;
