import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    authData.login({ username: form.email, password: form.password });
  };

  useEffect(() => {
    if (authData.auth) {
      navigate("/");
    }
  });

  return (
    <main>
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
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

        <input type="submit" value="Signup" />
      </form>
    </main>
  );
};

export default LoginPage;
