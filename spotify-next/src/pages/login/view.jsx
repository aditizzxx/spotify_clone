import Button from "../../components/UI/Button";
import logo from "../../img/logo.svg";
import Input from "../../components/UI/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login({ fetchLoginAction, LoginDetails, LoginError }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const email = data.email;
    const password = data.password;

    if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }

    try {
      fetchLoginAction({ email, password });
    } catch (error) {
      console.log(error);
    }
  };
  if (status === "loading") {
    return <></>;
  }
  if (session) {
    router.replace("/");
    return <></>;
  }
  // console.log(LoginError);

  return (
    <>
      <div className="vip">
        <div className="auth ">
          <form className="auth__form p-8 mb-32 flex flex-col items-center gap-4 bg-[#242424] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)]" onSubmit={handleLogin}>
            <Image className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Link href="/signup" className="auth__form-link text-[#b3b3b3] text-3xl underline cursor-pointer hover:text-[#fff]">
              Sign Up here
            </Link>
            <Input
              type="email"
              placeholder="Email"
              required={true}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {LoginError && (
              <span key={LoginError} role="alert" className="invalid-feedback text-[70%] text-[#ea0808]" >
                <strong>{LoginError?.message}</strong>
              </span>
            )}

            <Input
              type="password"
              placeholder="Password"
              required={true}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link href="/forgotPassword" className="auth__form-link">
              Forgot password?
            </Link>

            <Button type="submit">Login</Button>
          </form>
          <p className="note md:text-2xl xs:text-base">
            ☝🏻 Please note that authentication may take a few minutes. As the
            server spins down a free web service that goes 15 minutes without
            receiving inbound traffic, it takes some time to start.
          </p>
        </div>
      </div>
    </>
  );
}
