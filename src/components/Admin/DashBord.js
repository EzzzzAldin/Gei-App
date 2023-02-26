import { useState } from "react";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./DashBord.module.css";

import logo from "../../shared/assets/images/GE_Logo.png";
import admin from "../../shared/assets/images/undraw_pic_profile_re_7g2h.svg";
import team from "../../shared/assets/images/undraw_engineering_team_a7n2.svg";

const DashBord = () => {
  const [closemsg, setClosemsg] = useState(true);

  const closeMsgHandler = () => {
    setClosemsg(!closemsg);
  };

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
            <p>Ezz Aldin</p>
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
                  <p>1500</p>
                </div>
                <div className={classes.info}>
                  <h3 className={classes["info-ad"]}>Total</h3>
                  <p>20</p>
                </div>
              </div>
              <div className={`col-3 ${classes.card} mb-4`}>
                <div className={classes.icon}>
                  <i className="fa-solid fa-users-line"></i>
                </div>
                <div>Create Account</div>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-1`}>
                <div className={classes.icon}>
                  <i class="fa-solid fa-user-graduate"></i>
                </div>
                <div>Get Data Of Student</div>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-1`}>
                <div className={classes.icon}>
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div>Add Level to Student</div>
              </div>
              <div className={`col-3 ${classes.card} mb-4`}>
                <div className={classes.icon}>
                  <i class="fa-solid fa-book-bookmark"></i>
                </div>
                <div>Add Subjects to Student</div>
              </div>
              <div className={`col-3 ${classes.card} mb-4 offset-5`}>
                <div className={classes.icon}>
                  <i class="fa-solid fa-square-poll-horizontal"></i>
                </div>
                <div>Add Grades to Student</div>
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
