import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { fetchRequestUser } from "../features/requestSlice";

const UserRequestsPage = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.request);
  const { requestLoading, requests, requestMessage } = requestState;
  const cxtData = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchRequestUser(cxtData.auth.access));
  }, []);

  return (
    <main className="container left-border-box box-shadow">
      <div className="main-box user-req-page">
        {!requestLoading
          ? requests.map((item, i) => {
              console.log(item);
              return (
                <div key={i} className="flex">
                  <h2>
                    {item.type === "req_for_you"
                      ? "Request For You"
                      : "Request By You"}
                  </h2>
                  <table>
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Requested By</th>
                        <th>Requested To</th>
                        <th>Blood Group</th>
                        <th>Status</th>
                        <th>Cancel Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.data.map((x, ind) => (
                        <tr key={ind}>
                          <td>{ind + 1}</td>
                          <td>{x.ba_full_name}</td>
                          <td>{x.bd_full_name}</td>
                          <td>{x.requested_blood}</td>
                          <td>
                            {x.donation_status ? "Donated" : "Not Donated"}
                          </td>
                          <td>{x.cancel_status ? "Canceled" : "Pending"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr />
                </div>
              );
            })
          : "Loading"}
      </div>
    </main>
  );
};

export default UserRequestsPage;
