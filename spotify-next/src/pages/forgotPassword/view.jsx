import Image from "next/image";
import logo from "../../img/logo.svg";
import { useState } from "react";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import { toast } from "react-toastify";
import axios from "axios";
import jwt from 'jsonwebtoken';

export default function Forgot({fetchForgotPasswordDetailsWatcher,ForgotPasswordData}) {

  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }
    try {
      fetchForgotPasswordDetailsWatcher({email});
      toast.success("Email sent");  
    } catch (error) {
      toast.error(err.message)
    }
  };

  return (
    <>
      {/* {!session ? ( */}
        <div className="auth">
          <form className="auth__form" onSubmit={handleFormSubmit}>
          <Image className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Input
              type="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">Send Token</Button>
          </form>
        </div>
      {/* ) : (
        router.path === '/'
      )} */}
    </>
  );
}
