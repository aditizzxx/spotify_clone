import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "src/components/UI/Input";
import Button from "src/components/UI/Button";
import Image from "next/image";
import logo from "../../img/logo.svg";
import axios from "axios";

const ResetPassword = ({ResetPasswordData,fetchResetPasswordDetailsWatcher}) => {
  const session = useSession();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();
  const token = router.query;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) toast.warn("Passwords do not match");
    else {
      fetchResetPasswordDetailsWatcher({resetToken: token.token,password,passwordConfirm,});
    }
  };

  useEffect(() => {
    if (ResetPasswordData?.status === 200) {
      window.location.href = '/login';
    }
  }, [ResetPasswordData]);

  return (
    <>
      <div className="auth">
        <form className="auth__form" onSubmit={handleFormSubmit}>
          <Image className="auth__form-logo" src={logo} alt="Spotify logo" />
          <Input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button type="submit">
            Change Password
            {/* {user.loading ? "Loading" : "Update password"} */}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
