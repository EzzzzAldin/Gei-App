import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./ExamResults.module.css";
import exam from "../../shared/assets/images/Humaaans - Paperwork.png";
import tech from "../../shared/assets/images/Humaaans - 1 Character.png";
import girls from "../../shared/assets/images/Humaaans - 3 Characters.png";
import MainNavigation from "../layout/MainNavigation";

const ExamRsults = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:3000/student/data", {
          headers: {
            token: token,
          },
        });

        setSubjects(res.data.subjects);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentData();
  }, []);

  let dataContent = subjects.map((subject) => (
    <div
      key={subject.subject}
      className={`${classes.card} col-lg-3 col-md-6 col-sm-12`}
    >
      <div className={classes.icons}>
        <img src={exam} alt="exam" />
      </div>
      <h3>{subject.subject}</h3>
      <div className={classes.grade}>
        <h3>{`${subject.degree}%`}</h3>
      </div>
    </div>
  ));

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className={`row ${classes.cards}`}>{dataContent}</div>
      <img src={girls} alt="team" className={classes.shape} />
      <img src={tech} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default ExamRsults;
