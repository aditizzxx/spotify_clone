import Link from "next/link";
import logo from "../../img/logo.svg";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import Image from "next/image";
import { useEffect, useState } from "react";
// import isValidEmail from "src/components/auth/isValidEmail";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SignUp({ fetchSignupDetailsWatcher, SignUpData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();
  const data = SignUpData;
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm)
      return toast.warn("Passwords do not match");
    else if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }
    fetchSignupDetailsWatcher({ name, email, password, passwordConfirm });
    router.replace("/login");
  };

  return (
    <>
      <div className="auth">
        <form className="auth__form p-8 flex flex-col items-center gap-4 bg-[#242424] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)]" onSubmit={handleSignup}>
          <Image className="auth__form-logo mb-0rem" src={logo} alt="Spotify logo" />
          <Link href="/login" className="auth__form-link text-[#b3b3b3] text-3xl underline cursor-pointer hover:text-[#fff]">
            Log In here
          </Link>
          <Input
            name="name"
            id="name"
            placeholder="Name"
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type={email}
            name="email"
            id="email"
            placeholder="Email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Password Confirm"
            required={true}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </form>

        {/* <p className="note md:text-2xl xs:text-base">
          ☝🏻 Please note that authentication may take a few minutes. As the
          server spins down a free web service that goes 15 minutes without
          receiving inbound traffic, it takes some time to start.
        </p> */}
      </div>
    </>
  );
}
