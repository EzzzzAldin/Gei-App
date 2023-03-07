import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "../../shared/assets/images/GE_Logo.png";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Navbar className={`navbar-expand-lg bg-body-tertiary ${classes.nav}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin">
          <img src={logo} alt="logo" />
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <button className={`btn ${classes.btn}`} onClick={logoutHandler}>
            Logout
          </button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MainNavigation;
