import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomeAdmin from "./pages/HomeAdmin";
import CreateAccount from "./components/Admin/CreateAccount";
import FormAdminAccount from "./components/Admin/FormAdminAccount";
import FormStudentAccount from "./components/Admin/FormStudentAccount";
import GetDataStudent from "./components/Admin/GetDataStudent";
import AddLevel from "./components/Admin/AddLevel";
import AddSubjects from "./components/Admin/AddSubjects";
import AddGrades from "./components/Admin/AddGrades";
import AuthContext from "./store/auth-context";
// Student Branch
import HomeStudent from "./components/Student/HomeStudent";
import Profile from "./components/Student/Profile";
import ExamRsults from "./components/Student/ExamResults";
import ArrangementStudents from "./components/Student/ArrangementStudents";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const stateUser = authCtx.isAdmin;
  const isAdmin = stateUser === "true" ? true : false;
  const isStudent = stateUser === "false" ? true : false;

  return (
    <div className="App">
      <Routes>
        {isLoggedIn && (
          <Route
            path="/"
            element={
              isAdmin ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/student" replace />
              )
            }
          />
        )}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && isAdmin && (
          <Route path="/admin" element={<HomeAdmin />} />
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/admin/create-account" element={<CreateAccount />} />
        )}
        {isLoggedIn && isAdmin && (
          <Route
            path="/admin/create-account/form-admin"
            element={<FormAdminAccount />}
          />
        )}
        {isLoggedIn && isAdmin && (
          <Route
            path="/admin/create-account/form-student"
            element={<FormStudentAccount />}
          />
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/admin/student-data" element={<GetDataStudent />} />
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/admin/add-level" element={<AddLevel />} />
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/admin/add-subjects" element={<AddSubjects />} />
        )}
        {isLoggedIn && isAdmin && (
          <Route path="/admin/add-degrees" element={<AddGrades />} />
        )}
        {isLoggedIn && isStudent && (
          <Route path="/student" element={<HomeStudent />} />
        )}
        {isLoggedIn && isStudent && (
          <Route path="/student/profile" element={<Profile />} />
        )}
        {isLoggedIn && isStudent && (
          <Route path="/student/exam-results" element={<ExamRsults />} />
        )}
        {isLoggedIn && isStudent && (
          <Route
            path="/student/arrangement-students"
            element={<ArrangementStudents />}
          />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
      </Routes>
    </div>
  );
}

export default App;
