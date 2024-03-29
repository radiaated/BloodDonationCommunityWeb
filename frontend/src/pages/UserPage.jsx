import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../features/userProfileSlice";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { districts } from "../assets/districts";

const UserPage = () => {
  const dispatch = useDispatch();
  const cxtData = useContext(AuthContext);
  const userProfileState = useSelector((state) => state.userProfile);

  const { userLoading, user, userMessage } = userProfileState;
  const [form, setForm] = useState({
    first_name: "",
    email: "",
    blood_group: "",
    dob: "",
    district: "",
    category: "",
    phone: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(updateUserProfile({ data: form, token: cxtData.auth.access }));
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setForm({
        first_name: user.first_name,
        email: user.email,
        blood_group: user.blood_group,
        dob: user.dob,
        district: user.district,
        category: user.category,
        phone: user.phone,
        password: "",
        password2: "",
      });
    }

    if (Object.keys(user).length === 0) {
      dispatch(fetchUserProfile(cxtData.auth.access));
    }
  }, [userLoading]);

  return (
    <main className="container left-border-box box-shadow section">
      <form action="" onSubmit={handleSubmit} className=" sl-form flex">
        <h2>Your Information</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="first_name">Full Name:</label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
        <label htmlFor="bloodGroup">Blood Group:</label>
        <select
          name="bloodGroup"
          value={form.blood_group}
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
        <input type="submit" value="Update" />
      </form>
    </main>
  );
};

export default UserPage;
