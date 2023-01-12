import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const cxtData = useContext(AuthContext);

  return cxtData.auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
