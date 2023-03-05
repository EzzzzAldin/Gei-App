import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import HomeAdmin from "./pages/HomeAdmin";
import CreateAccount from "./components/Admin/CreateAccount";
import FormAdminAccount from "./components/Admin/FormAdminAccount";
import FormStudentAccount from "./components/Admin/FormStudentAccount";
import GetDataStudent from "./components/Admin/GetDataStudent";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>GEI App</h1>} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && <Route path="/admin" element={<HomeAdmin />} />}
        {isLoggedIn && (
          <Route path="/admin/create-account" element={<CreateAccount />} />
        )}
        {isLoggedIn && (
          <Route
            path="/admin/create-account/form-admin"
            element={<FormAdminAccount />}
          />
        )}
        {isLoggedIn && (
          <Route
            path="/admin/create-account/form-student"
            element={<FormStudentAccount />}
          />
        )}
        {isLoggedIn && (
          <Route path="/admin/student-data" element={<GetDataStudent />} />
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
