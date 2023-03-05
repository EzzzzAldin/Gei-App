import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./DashBord.module.css";

import logo from "../../shared/assets/images/GE_Logo.png";
import admin from "../../shared/assets/images/undraw_pic_profile_re_7g2h.svg";
import team from "../../shared/assets/images/undraw_engineering_team_a7n2.svg";

// Pages

const DashBord = () => {
  const [closemsg, setClosemsg] = useState(true);
  const [nameAdmin, setNameAdmin] = useState("");
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const closeMsgHandler = () => {
    setClosemsg(!closemsg);
  };

  useEffect(() => {
    async function getNameAdmin() {
      try {
        const token = await localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:3000/admin/data-admin", {
          headers: {
            token: token,
          },
        });

        setNameAdmin(res.data.name);
        // Method 1
        // if (totalAdmins < res.data.totalAdmins)
        //   setTotalAdmins((totalAdmins) => totalAdmins + 1);

        const intervalAdmins = setInterval(() => {
          setTotalAdmins((totalAdmins) => totalAdmins + 1);
          clearInterval(intervalAdmins);
        }, 200);
        const intervalStudents = setInterval(() => {
          setTotalStudents((totalStudents) => totalStudents + 1);
          clearInterval(intervalStudents);
        }, 200);

        if (totalAdmins === res.data.totalAdmins) clearInterval(intervalAdmins);
        if (totalStudents === res.data.totalStudents)
          clearInterval(intervalStudents);
      } catch (error) {
        console.log(error);
      }
    }

    getNameAdmin();
  }, [totalAdmins, totalStudents]);

  let closeHeaderClasses = closemsg
    ? classes["header-close"]
    : classes["header-msg"];
  let closeMsgClasses = closemsg
    ? classes["messenger-close"]
    : classes.messenger;

  return (
    <section className={`${classes["main-section"]}`}>
      <div className="row">
        <div
          className={`col-2 d-flex flex-column align-items-center ${classes["main-info"]}`}
        >
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div
            className={`${classes.profile} d-flex flex-column align-items-center`}
          >
            <img src={admin} alt="admin" />
            <p>{nameAdmin}</p>
          </div>
          <div className={closeMsgClasses}>
            <div className={closeHeaderClasses} onClick={closeMsgHandler}>
              messenger
              <i className="fa-solid fa-message"></i>
            </div>
          </div>
        </div>
        <div className="col-8">
          <Container>
            <div className="row">
              <div className={`col-12 ${classes.total}`}>
                <div className={classes.info}>
                  <h3 className={classes["info-st"]}>Total</h3>
                  <p>{totalStudents}</p>
                </div>
                <div className={classes.info}>
                  <h3 className={classes["info-ad"]}>Total</h3>
                  <p>{totalAdmins}</p>
                </div>
              </div>
              <div className={`col-3 ${classes.card} mb-4`}>
                <Link to="/admin/create-account">
                  <div className={classes.icon}>
                    <i className="fa-solid fa-users-line"></i>
                  </div>
                  <p>Create Account</p>
                </Link>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-1`}>
                <Link to="/admin/student-data">
                  <div className={classes.icon}>
                    <i className="fa-solid fa-user-graduate"></i>
                  </div>
                  <p>Get Data Of Student</p>
                </Link>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-1`}>
                <Link to="/">
                  <div className={classes.icon}>
                    <i className="fa-solid fa-chart-simple"></i>
                  </div>
                  <p>Add Level to Student</p>
                </Link>
              </div>
              <div className={`col-3 ${classes.card} mb-4`}>
                <Link to="/">
                  <div className={classes.icon}>
                    <i className="fa-solid fa-book-bookmark"></i>
                  </div>
                  <p>Add Subjects to Student</p>
                </Link>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-1`}>
                <Link to="/">
                  <div className={classes.icon}>
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <p>Add Department to Student</p>
                </Link>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-1`}>
                <Link to="/">
                  <div className={classes.icon}>
                    <i className="fa-solid fa-square-poll-horizontal"></i>
                  </div>
                  <p>Add Grades to Student</p>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <img src={team} alt="team" className={classes.shape} />
    </section>
  );
};

export default DashBord;
