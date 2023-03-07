import { useState } from "react";

import classes from "./FormAddGrades.module.css";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormAddGrades = (props) => {
  const [grade, setGrade] = useState(0);

  const changeGradeHandler = (e) => {
    setGrade(e.target.value);
  };

  const addSubjectHandler = () => {
    const newSubj = {
      subject: props.subject,
      degree: grade,
    };

    props.onAddedNewSubject(newSubj);
  };

  return (
    <div className={`${classes["data-form"]} mb-3`}>
      <h4>{`Subject: ${props.subject}`}</h4>
      <div>
        <Form.Label>Grade</Form.Label>
        <input
          type="number"
          className="form-control"
          value={grade}
          onChange={changeGradeHandler}
        />
      </div>
      <button type="button" className="btn" onClick={addSubjectHandler}>
        Add Grade
      </button>
    </div>
  );
};

export default FormAddGrades;
