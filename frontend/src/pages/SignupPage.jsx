import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { districts } from "../assets/districts";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [fMessage, setFMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    bloodGroup: "-1",
    dob: "",
    category: "-1",
    district: "-1",
    phone: "",
    password: "",
    password2: "",
  });
  const authData = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authData.setMessage("");
    setFMessage("");

    console.log(new Date().getFullYear() - new Date(form.dob).getFullYear());
    const email_regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phone_regex = /^[0-9]{10}$/;
    if (!form.email.match(email_regex)) {
      setFMessage("Enter appropriate email.");
    } else if (
      new Date().getFullYear() - new Date(form.dob).getFullYear() < 18 ||
      new Date().getFullYear() - new Date(form.dob).getFullYear() > 60
    ) {
      setFMessage("Your age must be between 18 and 60.");
    } else if (form.fullName === "") {
      setFMessage("Enter your full name");
    } else if (form.bloodGroup === "-1") {
      setFMessage("Select your group");
    } else if (form.district === "-1") {
      setFMessage("Select your district");
    } else if (!form.phone.match(phone_regex)) {
      setFMessage("Enter your phone number");
    } else if (form.password !== form.password2) {
      setFMessage("Password do not match");
    } else if (form.password === "" || form.password === "") {
      setFMessage("Enter your password");
    } else {
      authData.register(form);
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
        <h2>Signup</h2>
        <hr />
        {authData.message && <div className="sl-msg">{authData.message}</div>}
        {fMessage && <div className="sl-msg">{fMessage}</div>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        <label htmlFor="bloodGroup">Blood Group:</label>
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
        >
          <option value={false}>Select</option>
          <option value="a+">A+</option>
          <option value="a-">A-</option>
          <option value="b+">B+</option>
          <option value="b-">B-</option>
          <option value="o+">O+</option>
          <option value="o+">O-</option>
          <option value="ab+">AB+</option>
          <option value="ab-">AB-</option>
        </select>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />
        <label htmlFor="district">District:</label>
        <select name="district" value={form.district} onChange={handleChange}>
          <option value={false}>Select</option>
          {districts.map((item, i) => (
            <option value={i + 1} key={i}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="category">Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="-1">Select</option>
          <option value="1">Donor</option>
          <option value="2">In Need</option>
        </select>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={form.password2}
          onChange={handleChange}
        />
        <input type="submit" value="Signup" />
        <div>
          Have account? <Link to="/login">Login</Link>
        </div>
      </form>
    </main>
  );
};

export default SignupPage;
