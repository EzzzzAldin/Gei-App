import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Profile.module.css";
import boy from "../../shared/assets/images/Humaaans - Space.png";
import tech from "../../shared/assets/images/Humaaans - 1 Character.png";
import girls from "../../shared/assets/images/Humaaans - 3 Characters.png";
import MainNavigation from "../layout/MainNavigation";

const Profile = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [studentTotalGrade, setStudentTotalGrade] = useState("");

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:3000/student/genral-data",
          {
            headers: {
              token: token,
            },
          }
        );

        setStudentName(res.data.name);
        setStudentEmail(res.data.email);
        setStudentLevel(res.data.Level);
        setStudentTotalGrade(res.data.totelDegrees);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentData();
  }, []);

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className={classes["profile-card"]}>
        <div className={classes.icons}>
          <img src={boy} alt="boy" />
        </div>
        <h3>{studentName}</h3>
        <h3>{studentEmail}</h3>
        <div className={classes["main-info"]}>
          <h4>
            Level <span>{studentLevel}</span>
          </h4>
          <h4>
            Section <span>A2</span>
          </h4>
          <h4>
            total Grade <span>{studentTotalGrade}</span>
          </h4>
        </div>
      </div>
      <img src={girls} alt="team" className={classes.shape} />
      <img src={tech} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default Profile;
