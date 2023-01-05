import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const authData = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [fMessage, setFMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    authData.setMessage("");
    setFMessage("");
    console.log(form);
    const email_regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!form.email.match(email_regex)) {
      setFMessage("Enter appropriate email.");
    } else {
      authData.login({ username: form.email, password: form.password });
    }
  };

  useEffect(() => {
    if (authData.auth) {
      navigate("/");
    }

    return () => {
      authData.setMessage("");
      setFMessage("");
    };
  }, []);

  return (
    <main className="container left-border-box box-shadow section">
      <form action="" onSubmit={handleSubmit} className="sl-form flex">
        <h2>Login</h2>
        <hr />
        {authData.message && <div className="sl-msg">{authData.message}</div>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
        <div>
          New? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
