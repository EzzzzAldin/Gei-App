import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  isAdmin: false,
});

export const AuthContextProvider = (props) => {
  const intialStatus = localStorage.getItem("isAdmin");
  const intialToken = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(intialStatus);
  const [token, setToken] = useState(intialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = async (token) => {
    setToken(token);
    localStorage.setItem("token", token);

    const getRes = await axios.get("http://127.0.0.1:3000/user", {
      headers: {
        token: token,
      },
    });
    const statusUser = await getRes.data.status;
    if (statusUser === "Admin") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", true);
    } else {
      setIsAdmin(false);
      localStorage.setItem("isAdmin", false);
    }
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isAdmin: isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
