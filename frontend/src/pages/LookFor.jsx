import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonors } from "../features/donorsSlice";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const LookFor = () => {
  const [bloodType, setBloodType] = useState("all");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const donorsState = useSelector((state) => state.donors);
  const { donorsLoading, donors, donorsMessage } = donorsState;

  useEffect(() => {
    dispatch(fetchDonors("all"));
    console.log(donors);
  }, []);

  return (
    <main className="container left-border-box">
      <div className="main-box">
        <h2>Look For Blood</h2>
        <div className="filter-blood-type">
          <label>Filter: </label>
          <select
            value={bloodType}
            onChange={(e) => {
              setBloodType(e.target.value);
              dispatch(fetchDonors(e.target.value));
            }}
          >
            <option value="all">All</option>
            <option value="a+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="o+">O+</option>
            <option value="o-">o-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">ab-</option>
          </select>
        </div>

        {!donorsLoading ? (
          <table>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Full Name</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.length > 0 ? (
                donors.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.dob}</td>
                    <td>{item.blood_group}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/user/${item.id}`);
                        }}
                      >
                        See
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td> Empty</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          "Loading"
        )}
      </div>
    </main>
  );
};

export default LookFor;
