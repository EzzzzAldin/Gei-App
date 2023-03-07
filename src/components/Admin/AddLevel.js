import { useState, useRef } from "react";
import axios from "axios";

import classes from "./AddLevel.module.css";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";

const AddLevel = () => {
  const [addLevel, setAddLevel] = useState("");
  const [error, setError] = useState(false);

  const inputEmailRef = useRef();
  const inputLevellRef = useRef();

  const submitlHandler = async (event) => {
    event.preventDefault();
    const entredEmail = inputEmailRef.current.value;
    const entredLevel = inputLevellRef.current.value;

    try {
      const token = await localStorage.getItem("token");
      const postLevel = {
        email: entredEmail,
        level: entredLevel,
      };
      const res = await axios.post(
        "http://127.0.0.1:3000/admin/add-level",
        postLevel,
        {
          headers: {
            token: token,
          },
        }
      );

      setAddLevel(res.data.message);
      setError("");
    } catch (error) {
      setError(error.response.data);
      setAddLevel("");
    }
  };

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className="row mt-5">
        <div className={`col-4 ${classes["data-student"]} offset-4`}>
          <Form className="mt-5" onSubmit={submitlHandler}>
            <div className="mb-3">
              <Form.Label>Email address</Form.Label>
              <input
                type="email"
                className="form-control"
                ref={inputEmailRef}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Level Student</Form.Label>
              <input
                type="number"
                className="form-control"
                ref={inputLevellRef}
              />
            </div>
            <button type="submit" className="btn">
              Add Level
            </button>
          </Form>
          {addLevel.length > 0 && (
            <div className="alert alert-success mt-3" role="alert">
              Success Added Level
            </div>
          )}
          {error.length > 0 && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
      <img src={sign} alt="team" className={classes.shape} />
      <img src={el} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default AddLevel;
