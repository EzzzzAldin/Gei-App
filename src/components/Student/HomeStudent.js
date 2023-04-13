import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./HomeStudent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "../layout/MainNavigation";
import students from "../../shared/assets/images/Humaaans - 2 Characters.png";

const HomeStudent = () => {
  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className={`row ${classes.main}`}>
        <div className={`col-12 col-lg-6 ${classes.info}`}>
          <div className={classes.bacground}>
            <img src={students} alt="student" />
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-5">
          <div className="row">
            <div className={`col-12 col-lg-5 ${classes.card} mb-4 mt-5`}>
              <Link to="/student/profile">
                <div className={classes.icon}>
                  <i className="fa-regular fa-id-card"></i>
                </div>
                <p>View Profile</p>
              </Link>
            </div>
            <div
              className={`col-12 col-lg-5 ${classes.card} mb-4 mt-5 offset-lg-1`}
            >
              <Link to="/student/exam-results">
                <div className={classes.icon}>
                  <i className="fa-solid fa-square-poll-horizontal"></i>
                </div>
                <p>Exam results</p>
              </Link>
            </div>
            <div className={`col-12 col-lg-5 ${classes.card} mb-4`}>
              <Link to="/student/arrangement-students">
                <div className={classes.icon}>
                  <i className="fa-solid fa-arrow-up-1-9"></i>
                </div>
                <p>Arrangement Students</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStudent;
