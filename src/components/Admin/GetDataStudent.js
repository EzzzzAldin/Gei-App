import { useState } from "react";
import { Link } from "react-router-dom";

import useInput from "../../hooks/use-input";
import classes from "./GetDataStudent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "../../shared/assets/images/GE_Logo.png";

const GetDataStudent = () => {
  const [fullHeight, setFullHeight] = useState(false);

  const {
    value: entredEmail,
    hasError: emailInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const searchHandler = () => {
    setFullHeight(!fullHeight);
  };

  let dataClasses = fullHeight
    ? classes["data-student-full"]
    : classes["data-student"];
  let emailClasses = emailInvalid ? "error" : "search";

  return (
    <section className={classes["main-section"]}>
      <Link to="/admin">
        <img src={logo} alt="logo" />
      </Link>
      <div className="row mt-5">
        <div className={`col-6 ${dataClasses} offset-3`}>
          <div className={classes[emailClasses]}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="email"
              placeholder="Enter Student Email"
              value={entredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <button onClick={searchHandler}>Search</button>
            {emailInvalid && <p>Must Be Valid Email.</p>}
          </div>
          {fullHeight && (
            <div className={classes.info}>
              <div className={classes["username"]}>
                <h4>Ezz Aldin</h4>
              </div>
              <div className={classes.subject}>
                <h4>Subject</h4>
                <h4>Grade: 80</h4>
              </div>
              <div className={classes.subject}>
                <h4>Subject</h4>
                <h4>Grade: 80</h4>
              </div>
              <div className={classes.subject}>
                <h4>Subject</h4>
                <h4>Grade: 80</h4>
              </div>
              <div className={classes.subject}>
                <h4>Subject</h4>
                <h4>Grade: 80</h4>
              </div>
              <div className={classes.subject}>
                <h4>Subject</h4>
                <h4>Grade: 80</h4>
              </div>
              <div className={classes.subject}>
                <h4>Subject</h4>
                <h4>Grade: 80</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetDataStudent;
