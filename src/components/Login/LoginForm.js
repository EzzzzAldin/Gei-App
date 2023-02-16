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

const LoginForm = (props) => {
  const {
    value: entredEmail,
    valueIsValid: emailIsValid,
    hasError: emailInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset,
  } = useInput((value) => value.includes("@"));

  const {
    value: entredPassword,
    valueIsValid: passwordIsValid,
    hasError: passwordInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordlBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.length >= 6);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) formIsValid = true;

  const loginHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;
    reset();
    resetPassword();
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
      </form>
    </section>
  );
};

export default LoginForm;
