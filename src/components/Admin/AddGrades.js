import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

import classes from "./AddGrades.module.css";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FormAddGrades from "./FormAddGrades";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";
import LoadingSpinner from "../UI/LoadingSpinner";

const AddGrades = () => {
  const [fullHeight, setFullHeight] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [addedGrades, setAddedGrades] = useState("");
  const [error, setError] = useState(false);
  const [newSubject, setNewSubject] = useState([]);
  const [emails, setEmails] = useState([]);
  const [isLodaing, setIsLodaing] = useState(false);

  useEffect(() => {
    const getStudenstData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:3000/admin/data-students",
          {
            headers: {
              token: token,
            },
          }
        );

        setEmails(res.data.allEmailStudents);
      } catch (error) {
        console.log(error);
      }
    };
    getStudenstData();
  }, []);

  const options = emails;

  const [selectedEmail, setSelectedEmail] = useState(null);

  const changeEmailHandler = (option) => {
    setSelectedEmail(option);
  };

  const AddedNewSubjectHandler = (newSubjectsAdded) => {
    setNewSubject((newSubjects) => [...newSubjects, newSubjectsAdded]);
  };

  const searchHandler = async () => {
    setFullHeight(!fullHeight);
    setIsLodaing(true);
    try {
      const token = await localStorage.getItem("token");
      const getStudent = {
        email: selectedEmail.value,
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

      setIsLodaing(false);
      setStudentName(res.data.name);
      setStudentLevel(res.data.Level);
      setSubjects(res.data.subjects);

      setError("");
    } catch (error) {
      setIsLodaing(false);
      setError(error.response.data);
      console.log(error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLodaing(true);
    try {
      const token = await localStorage.getItem("token");

      const postDegrees = {
        email: selectedEmail.value,
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

      setIsLodaing(false);
      setAddedGrades(res.data.message);
      setError("");
    } catch (error) {
      setIsLodaing(false);
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

  let dataClasses = fullHeight
    ? classes["data-student-full"]
    : classes["data-student"];

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className="row mt-5">
        <div className={`col-6 ${dataClasses} offset-3`}>
          <div className={classes.search}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Select
              className={classes.input}
              value={selectedEmail}
              onChange={changeEmailHandler}
              options={options}
              placeholder="Select Email"
            />
            <button onClick={searchHandler}>Search</button>
          </div>
          {fullHeight && (
            <div className={classes.info}>
              <div className={classes["username"]}>
                <h4>{`Name: ${studentName}`}</h4>
                <h4>{`Level: ${studentLevel}`}</h4>
              </div>
              {!error && (
                <Form className="mt-5" onSubmit={submitHandler}>
                  {formContent}
                  {!isLodaing && (
                    <div className={classes["btns-group"]}>
                      <button type="submit" className="btn">
                        Done Added Grades
                      </button>
                    </div>
                  )}
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
              {isLodaing && <LoadingSpinner />}
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
