import { useState } from "react";
import axios from "axios";
import useInput from "../../hooks/use-input";

import classes from "./AddGrades.module.css";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FormAddGrades from "./FormAddGrades";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";

const AddGrades = () => {
  const [fullHeight, setFullHeight] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [addedGrades, setAddedGrades] = useState("");
  const [error, setError] = useState(false);

  const [newSubject, setNewSubject] = useState([]);

  const AddedNewSubjectHandler = (newSubjectsAdded) => {
    setNewSubject((newSubjects) => [...newSubjects, newSubjectsAdded]);
  };

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

      setStudentName(res.data.name);
      setStudentLevel(res.data.Level);
      setSubjects(res.data.subjects);

      setError("");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const token = await localStorage.getItem("token");

      const postDegrees = {
        email: entredEmail,
        level: studentLevel,
        subjects: newSubject,
      };
      const res = await axios.put(
        "http://127.0.0.1:3000/admin/add-degrees",
        postDegrees,
        {
          headers: {
            token: token,
          },
        }
      );
      setAddedGrades(res.data.message);
      setError("");
    } catch (error) {
      setError(error.response.data);
      setAddedGrades("");
      console.log(error);
    }
  };

  let formContent = subjects.map((subject, index) => (
    <FormAddGrades
      key={index}
      subject={subject.subject}
      onAddedNewSubject={AddedNewSubjectHandler}
    />
  ));

  let dataClasses =
    fullHeight && !emailInvalid
      ? classes["data-student-full"]
      : classes["data-student"];
  let emailClasses = emailInvalid ? "error" : "search";

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
          {fullHeight && !emailInvalid && (
            <div className={classes.info}>
              <div className={classes["username"]}>
                <h4>{`Name: ${studentName}`}</h4>
                <h4>{`Level: ${studentLevel}`}</h4>
              </div>
              {!error && (
                <Form className="mt-5" onSubmit={submitHandler}>
                  {formContent}
                  <div className={classes["btns-group"]}>
                    <button type="submit" className="btn">
                      Done Added Grades
                    </button>
                  </div>
                </Form>
              )}
              {addedGrades.length > 0 && (
                <div
                  className={`alert alert-success mt-5 ${classes["err-alret"]}`}
                  role="alert"
                >
                  {addedGrades}
                </div>
              )}
              {error && (
                <div
                  className={`alert alert-danger mt-5 ${classes["err-alret"]}`}
                  role="alert"
                >
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <img src={sign} alt="team" className={classes.shape} />
      <img src={el} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default AddGrades;
