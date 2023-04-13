import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./ArrangementStudents.module.css";
import tech from "../../shared/assets/images/Humaaans - 1 Character.png";
import girls from "../../shared/assets/images/Humaaans - 3 Characters.png";
import MainNavigation from "../layout/MainNavigation";

const ArrangementStudents = () => {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    const getStudenstData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:3000/student/arrangement-student",
          {
            headers: {
              token: token,
            },
          }
        );

        setStudent(res.data.students);
      } catch (error) {
        console.log(error);
      }
    };
    getStudenstData();
  }, []);

  let dataContent = students.map((student, index) => (
    <div key={student} className={`col-12 ${classes.card}`}>
      <h3>
        <span>{index + 1}</span>
        {student}
      </h3>
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

export default ArrangementStudents;
