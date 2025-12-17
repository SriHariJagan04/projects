import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import { AuthContext } from "../../store/contexts/AuthContext";

export default function LoginSignup() {
  const { login, signup, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isRightPanel, setIsRightPanel] = useState(false);
  const [mobileForm, setMobileForm] = useState("signin");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  // Resize watcher
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop toggle
  const handleSignIn = () => {
    if (isMobile) setMobileForm("signin");
    else setIsRightPanel(false);
  };

  const handleSignUp = () => {
    if (isMobile) setMobileForm("signup");
    else setIsRightPanel(true);
  };

  // Signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signup(name, email, password);

    if (!res.success) {
      alert(res.message);
    } else {
      form.reset(); // Clear fields

      // 🔥 Switch to SIGN-IN page after account created
      if (isMobile) setMobileForm("signin");
      else setIsRightPanel(false);
    }
  };

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const res = await login(email, password);

    if (!res.success) {
      alert(res.message);
    } else {
      form.reset(); // Clear form

      // 🔥 Redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div
        className={`${styles.container} ${
          isRightPanel ? styles.rightPanelActive : ""
        }`}
      >
        {/* MOBILE SWITCH BUTTONS */}
        {isMobile && (
          <div className={styles.mobileToggle}>
            <button
              className={mobileForm === "signin" ? styles.activeBtn : ""}
              onClick={() => setMobileForm("signin")}
            >
              Sign In
            </button>
            <button
              className={mobileForm === "signup" ? styles.activeBtn : ""}
              onClick={() => setMobileForm("signup")}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* SIGN UP FORM */}
        <div
          className={`${styles.formContainer} ${styles.signUpContainer} ${
            mobileForm === "signup" ? styles.activeMobile : ""
          }`}
        >
          <form onSubmit={handleSignupSubmit}>
            <h1>Create Account</h1>
            <input name="name" type="text" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={loading ? styles.loadingBtn : ""}
            >
              {loading ? "Creating..." : "Sign Up"}
              {/* {loading && <div className={styles.loader}></div>} */}
            </button>
          </form>
        </div>

        {/* SIGN IN FORM */}
        <div
          className={`${styles.formContainer} ${styles.signInContainer} ${
            mobileForm === "signin" ? styles.activeMobile : ""
          }`}
        >
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <input name="email" type="email" placeholder="Email" required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <a className={styles.forgotLink} href="#">
              Forgot Password?
            </a>
            <button
              type="submit"
              disabled={loading}
              className={loading ? styles.loadingBtn : ""}
            >
              {loading ? "Signing In..." : "Sign In"}
              {/* {loading && <div className={styles.loader}></div>} */}
            </button>
          </form>
        </div>

        {/* DESKTOP OVERLAY */}
        {!isMobile && (
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                <h1>Welcome Back!</h1>
                <p>Login with your details to continue</p>
                <button className={styles.ghost} onClick={handleSignIn}>
                  Sign In
                </button>
              </div>

              <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                <h1>Hello Friend!</h1>
                <p>Start your journey with us</p>
                <button className={styles.ghost} onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
