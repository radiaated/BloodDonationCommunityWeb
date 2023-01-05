import { useState, createContext, useEffect } from "react";
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

  const [message, setMessage] = useState("");

  const register = async (data) => {
    await axios
      .post("http://127.0.0.1:8000/api/register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        login({ username: data.email, password: data.password });

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setMessage(
          "Unable to create an account. Please check your informations."
        );
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
        localStorage.setItem(
          "bdbCreds",
          JSON.stringify({ access: res.data.access, refresh: res.data.access })
        );
        localStorage.setItem(
          "bdbUser",
          JSON.stringify({ userId: res.data.id, fullName: res.data.name })
        );
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.detail);
      });
  };

  const refresh = async () => {
    console.log(auth);
    await axios
      .post(
        "http://127.0.0.1:8000/api/token/refresh/",
        { refresh: auth.refresh },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAuth(res.data);
        localStorage.setItem("bdbCreds", JSON.stringify(res.data));
      })
      .catch((err) => {
        logout();
      });
  };

  const logout = () => {
    if (localStorage.getItem("bdbCreds") && localStorage.getItem("bdbUser")) {
      localStorage.removeItem("bdbCreds");
      localStorage.removeItem("bdbUser");
      window.location.reload();
    }
  };

  const contextData = {
    auth,
    register,
    login,
    logout,
    message,
    setMessage,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (auth) {
        refresh();
      }
    }, 10000);

    return () => {
      clearInterval(interval);

      // refresh();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
