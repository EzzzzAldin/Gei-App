import { Link } from "react-router-dom";

import classes from "./CreateAccount.module.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "../layout/MainNavigation";

import adminPic from "../../shared/assets/images/features-02.jpg";
import studentPic from "../../shared/assets/images/features-01.jpg";

const CreateAccount = () => {
  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <Container>
        <div className="row">
          <div className={`col-3 ${classes.card} offset-2`}>
            <div className={classes.img}>
              <img src={adminPic} alt="admin" />
            </div>
            <h3>Admin Account</h3>
            <button>
              <Link to="/admin/create-account/form-admin">Create</Link>
            </button>
          </div>
          <div className={`col-3 ${classes["student-card"]} offset-2`}>
            <div className={classes.img}>
              <img src={studentPic} alt="student" />
            </div>
            <h3>Student Account</h3>
            <button>
              <Link to="/admin/create-account/form-student">Create</Link>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreateAccount;
