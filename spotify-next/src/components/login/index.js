import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.replace("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "The email field is required";
    }
    if (!password.trim()) {
      newErrors.password = "The password field is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // console.log('Form submitted successfully');
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setErrors({
          email: "These credentials do not match our records.",
          password: null,
        });
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="_token" />

                <div className="form-group row">
                  <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                    E-Mail Address
                  </label>

                  <div className="col-md-6">
                    <input
                      id="email"
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : "form-control-user"}`}
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      autoFocus
                    />
                    {/* {errors && errors.credentials && <strong className="invalid-feedback">{errors.credentials}</strong>} */}

                    {errors && errors.email && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.email}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password
                  </label>

                  <div className="col-md-6">
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : "form-control-user"
                      }`}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />

                    {errors && errors.password && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.password}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6 offset-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />

                      <label className="form-check-label" htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group row mb-0">
                  <div className="col-md-8 offset-md-4">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    <a className="btn btn-link" href="/password/reset">
                      Forgot Your Password?
                    </a>
                  </div>
                </div>
              </form>
              {/* {errors.credentials && <strong style={{ color: 'red' }}>{errors.credentials}</strong>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
