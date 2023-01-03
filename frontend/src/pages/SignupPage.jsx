import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { districts } from "../assets/districts";

const SignupPage = () => {
  const navigate = useNavigate();
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
    console.log(form);
    authData.register(form);
  };

  useEffect(() => {
    if (authData.auth) {
      navigate("/");
    }
  });

  return (
    <main className="container left-border-box box-shadow">
      <form action="" onSubmit={handleSubmit} className="sl-form flex">
        <h2>Signup</h2>
        <hr />
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
      </form>
    </main>
  );
};

export default SignupPage;
