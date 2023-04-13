import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

import classes from "./AddLevel.module.css";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";
import LoadingSpinner from "../UI/LoadingSpinner";

const AddLevel = () => {
  const [addLevel, setAddLevel] = useState("");
  const [error, setError] = useState(false);
  const [emails, setEmails] = useState([]);
  const [isLodaing, setIsLodaing] = useState(false);

  const inputLevellRef = useRef();

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

  const submitlHandler = async (event) => {
    event.preventDefault();
    const entredEmail = selectedEmail.value;
    const entredLevel = inputLevellRef.current.value;

    setIsLodaing(true);

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

      setIsLodaing(false);
      setAddLevel(res.data.message);
      setError("");
    } catch (error) {
      setIsLodaing(false);
      setError(error.response.data);
      setAddLevel("");
      console.log(error);
    }
  };

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className="row mt-5">
        <div className={`col-4 ${classes["data-student"]} offset-4`}>
          <Form className="mt-5" onSubmit={submitlHandler}>
            <div className="mb-3">
              <Select
                className="mt-4"
                value={selectedEmail}
                onChange={changeEmailHandler}
                options={options}
                placeholder="Select Email"
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
          {isLodaing && <LoadingSpinner />}
        </div>
      </div>
      <img src={sign} alt="team" className={classes.shape} />
      <img src={el} alt="team" className={classes["shape-left"]} />
    </section>
  );
};

export default AddLevel;
