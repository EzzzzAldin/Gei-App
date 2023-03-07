import { useState } from "react";
import axios from "axios";

import useInput from "../../hooks/use-input";
import classes from "./GetDataStudent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";

const GetDataStudent = () => {
  const [fullHeight, setFullHeight] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [subjects, setSubjects] = useState([]);

  const {
    value: entredEmail,
    hasError: emailInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const searchHandler = async () => {
    setFullHeight(!fullHeight);
    try {
      const token = await localStorage.getItem("token");
      const getStudent = {
        email: entredEmail,
      };
      const res = await axios.post(
        "http://127.0.0.1:3000/admin/student-data",
        getStudent,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(res);
      setStudentName(res.data.name);
      setStudentLevel(res.data.Level);
      setSubjects(res.data.subjects);
      if (res.data.message) return setEmptyData(true);
    } catch (error) {
      console.log(error);
    }
  };

  let dataClasses = fullHeight
    ? classes["data-student-full"]
    : classes["data-student"];
  let emailClasses = emailInvalid ? "error" : "search";

  let dataContent = subjects.map((subject) => (
    <div className={classes.subject}>
      <h4>{`Subject: ${subject.subject}`}</h4>
      <h4>{`Grade: ${subject.degree}`}</h4>
    </div>
  ));

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
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
          {fullHeight && !emptyData && (
            <div className={classes.info}>
              <div className={classes["username"]}>
                <h4>{`Name: ${studentName}`}</h4>
                <h4>{`Level: ${studentLevel}`}</h4>
              </div>
              {dataContent}
            </div>
          )}
          {emptyData && (
            <p className={classes.empty}>
              This Student Is Exist But Not Add Any Data!
            </p>
          )}
        </div>
      </div>
      <img src={sign} alt="team" className={classes.shape} />
      <img src={el} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default GetDataStudent;
