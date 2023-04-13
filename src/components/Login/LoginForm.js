import { useState, useContext } from "react";
import axios from "axios";

import useInput from "../../hooks/use-input";

// Import Of Styles
import classes from "./LoginForm.module.css";
import logo from "../../shared/assets/images/GE_Logo.png";
import shape1 from "../../shared/assets/images/undraw_make_it_rain_re_w9pc.svg";
import boy from "../../shared/assets/images/undraw_pic_profile_re_7g2h.svg";
import girl from "../../shared/assets/images/undraw_profile_pic_re_iwgo.svg";
import shape2 from "../../shared/assets/images/undraw_educator_re_ju47.svg";
import shape3 from "../../shared/assets/images/undraw_projections_re_ulc6.svg";
import shape4 from "../../shared/assets/images/undraw_predictive_analytics_re_wxt8.svg";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);

  // To Handel Errors Of Request
  const [isError, setIsError] = useState("");
  const [isLodaing, setIsLodaing] = useState(false);

  // Validate From React
  const {
    value: entredEmail,
    hasError: emailInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const {
    value: entredPassword,
    hasError: passwordInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordlBlurHandler,
  } = useInput((value) => value.length >= 6);

  const loginHandler = (event) => {
    event.preventDefault();

    setIsLodaing(true);

    async function login() {
      try {
        const res = await axios.post("http://127.0.0.1:3000/login", {
          email: entredEmail,
          password: entredPassword,
        });

        if (res.status === 200) {
          setIsError("");
          await authCtx.login(res.data.token);
          window.location.reload();
          setIsLodaing(false);
        }
      } catch (error) {
        setIsLodaing(false);
        setIsError(error.response.data);
      }
    }

    login();
  };

  let emailClasses = emailInvalid ? "error" : "email-form";
  let passwordlClasses = passwordInvalid ? "error" : "password-form";

  return (
    <section className={classes["login-section"]}>
      <img src={shape1} alt="shape1" className={classes.shape} />
      <img
        src={shape2}
        alt="shape2"
        className={`${classes.shape} ${classes.left}`}
      />
      <img
        src={shape3}
        alt="shape3"
        className={`${classes.shape} ${classes.right}`}
      />
      <img
        src={shape4}
        alt="shape4"
        className={`${classes.shape} ${classes.bleft}`}
      />
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <form className={classes["login-form"]} onSubmit={loginHandler}>
        <div className={classes.icons}>
          <img src={boy} alt="boy" />
          <img src={girl} alt="girl" />
        </div>
        <div className={classes[emailClasses]}>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={entredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInvalid && <p>Must Be Valid Email.</p>}
        </div>
        <div className={classes[passwordlClasses]}>
          <input
            type="password"
            placeholder="Enter Password"
            value={entredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordlBlurHandler}
          />
          {passwordInvalid && <p>Must Be Valid Password.</p>}
        </div>
        <button>Login</button>
        {isError.length > 0 && (
          <div className={classes["error-request"]}>{isError}</div>
        )}
        {isLodaing && <LoadingSpinner />}
      </form>
      <footer>
        <p>&copy; 2023 Ezz Aldin. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default LoginForm;
