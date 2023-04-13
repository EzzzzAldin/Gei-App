import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

import classes from "./GetDataStudent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";
import LoadingSpinner from "../UI/LoadingSpinner";

const GetDataStudent = () => {
  const [fullHeight, setFullHeight] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [subjects, setSubjects] = useState([]);
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
      if (res.data.message) return setEmptyData(true);
    } catch (error) {
      setIsLodaing(false);
      console.log(error);
    }
  };

  let dataClasses = fullHeight
    ? classes["data-student-full"]
    : classes["data-student"];

  let dataContent = subjects.map((subject, index) => (
    <div key={index} className={classes.subject}>
      <h4>{`Subject: ${subject.subject}`}</h4>
      <h4>{`Grade: ${subject.degree}`}</h4>
    </div>
  ));

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
          {isLodaing && <LoadingSpinner />}
        </div>
      </div>
      <img src={sign} alt="team" className={classes.shape} />
      <img src={el} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default GetDataStudent;
