import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    localStorage.getItem("bdbCreds")
      ? JSON.parse(localStorage.getItem("bdbCreds"))
      : null
  );

  const register = async (data) => {
    await axios
      .post("http://127.0.0.1:8000/api/register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        login({ username: data.email, password: data.password });
        suc = true;
        navigate("/");
      });
  };

  const login = async (data) => {
    await axios
      .post(
        "http://127.0.0.1:8000/api/token/",
        data
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      .then((res) => {
        console.log(res);
        setAuth(res.data);
        localStorage.setItem("bdbCreds", JSON.stringify(res.data));
        navigate("/");
      });
  };

  const contextData = {
    auth,
    register,
    login,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
