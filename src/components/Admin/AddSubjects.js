import { useState, useRef } from "react";
import axios from "axios";

import classes from "./AddSubjects.module.css";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import sign from "../../shared/assets/images/undraw_sign__up_nm4k.svg";
import el from "../../shared/assets/images/undraw_electricity_k2ft.svg";
import MainNavigation from "../layout/MainNavigation";

const AddSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [addSubjects, setAddSubjects] = useState("");
  const [error, setError] = useState(false);

  const inputEmailRef = useRef();
  const inputLevellRef = useRef();
  const inpRef = useRef();

  const addSubjectHandler = () => {
    setSubjects([...subjects, { subject: "", degree: 0 }]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const entredEmail = inputEmailRef.current.value;
    const entredLevel = inputLevellRef.current.value;

    try {
      const token = await localStorage.getItem("token");
      const postSubject = {
        email: entredEmail,
        level: entredLevel,
        subjects,
      };
      const res = await axios.post(
        "http://127.0.0.1:3000/admin/add-subjects",
        postSubject,
        {
          headers: {
            token: token,
          },
        }
      );

      setAddSubjects(res.data.message);
      setError("");
    } catch (error) {
      setError(error.response.data);
      setAddSubjects("");
    }
  };

  let subjectsContent = subjects.map((subjectItem, index) => (
    <div key={index} className="mb-3">
      <Form.Label>Add Subject</Form.Label>
      <input
        type="text"
        className="form-control"
        placeholder="Name Subject"
        onChange={(e) => (subjectItem.subject = e.target.value)}
      />
    </div>
  ));

  return (
    <section className={classes["main-section"]}>
      <MainNavigation />
      <div className="row mt-5">
        <div className={`col-4 ${classes["data-student"]} offset-4 pb-5`}>
          <Form className="mt-5" onSubmit={submitHandler}>
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
            {subjectsContent}
            <div className={classes["btns-group"]}>
              <button
                type="button"
                className="btn m-2"
                onClick={addSubjectHandler}
              >
                Add New Subject
              </button>
              <button type="submit" className="btn">
                Done Added All Subjects
              </button>
            </div>
          </Form>
          {addSubjects.length > 0 && (
            <div className="alert alert-success mt-3" role="alert">
              Success Added Subject
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

export default AddSubjects;
