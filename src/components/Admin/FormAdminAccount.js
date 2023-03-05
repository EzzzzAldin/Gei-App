import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import useInput from "../../hooks/use-input";

import classes from "./FormAdminAccount.module.css";
import logo from "../../shared/assets/images/GE_Logo.png";
import boy from "../../shared/assets/images/undraw_pic_profile_re_7g2h.svg";
import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";

const FormAdminAccount = () => {
  const [isError, setIsError] = useState("");
  const [isSucces, setIsSucces] = useState("");

  // Validate From React
  const {
    value: entredUsername,
    hasError: usernameInvalid,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput((value) => value.length >= 6);

  const {
    value: entredEmail,
    hasError: emailInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: entredPassword,
    hasError: passwordInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordlBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.length >= 6);

  const {
    value: entredrePassword,
    hasError: repasswordInvalid,
    valueChangeHandler: repasswordChangeHandler,
    inputBlurHandler: repasswordlBlurHandler,
    reset: resetRepassword,
  } = useInput((value) => value.length >= 6);

  const signupHandler = (event) => {
    event.preventDefault();

    async function signup() {
      try {
        const token = await localStorage.getItem("token");
        const newAdmin = {
          name: entredUsername,
          email: entredEmail,
          password: entredPassword,
          repeat_password: entredrePassword,
        };
        const res = await axios.post(
          "http://127.0.0.1:3000/admin/register-admin",
          newAdmin,
          {
            headers: {
              token: token,
            },
          }
        );

        if (res.status === 200) {
          setIsError("");
          setIsSucces(res.data.message);
          resetUsername();
          resetEmail();
          resetPassword();
          resetRepassword();
        }
      } catch (error) {
        setIsError(error.response.data);
        setIsSucces("");
      }
    }

    signup();
  };

  let usernameClasses = usernameInvalid ? "error" : "email-form";
  let emailClasses = emailInvalid ? "error" : "email-form";
  let passwordlClasses = passwordInvalid ? "error" : "password-form";
  let repasswordlClasses = repasswordInvalid ? "error" : "password-form";

  return (
    <section className={classes["main-section"]}>
      <Link to="/admin">
        <img src={logo} alt="logo" />
      </Link>
      <form className={classes["signup-form"]} onSubmit={signupHandler}>
        <div className={classes.icons}>
          <img src={boy} alt="boy" />
        </div>
        <div className={classes[usernameClasses]}>
          <input
            type="text"
            placeholder="Enter Your UserName"
            value={entredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          {usernameInvalid && <p>Must Be More Than 6 Charchter.</p>}
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
        <div className={classes[repasswordlClasses]}>
          <input
            type="password"
            placeholder="Enter Re-Password"
            value={entredrePassword}
            onChange={repasswordChangeHandler}
            onBlur={repasswordlBlurHandler}
          />
          {repasswordInvalid && <p>Must Be Same Password.</p>}
        </div>
        <button>SignUp</button>
        {isError.length > 0 && (
          <div className={classes["error-request"]}>{isError}</div>
        )}
        {isSucces.length > 0 && (
          <div className={classes["succes"]}>{isSucces}</div>
        )}
      </form>
      <img src={sign} alt="team" className={classes.shape} />
      <img src={el} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default FormAdminAccount;
