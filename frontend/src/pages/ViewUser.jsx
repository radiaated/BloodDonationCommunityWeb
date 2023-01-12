import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchViewUser } from "../features/viewUserSlice";
import { requestBlood } from "../features/requestSlice";
import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { districts } from "../assets/districts";

const ViewUser = () => {
  const dispatch = useDispatch();
  const viewUserState = useSelector((state) => state.viewUser);
  const { viewUser, viewUserLoading, viewUserMessage } = viewUserState;
  const requestState = useSelector((state) => state.request);
  const { request, requestLoading, requestMessage } = requestState;
  const params = useParams();
  const AuthCxt = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.id);
    dispatch(fetchViewUser(params.id));
  }, []);

  return (
    <main className="container left-border-box box-shadow section">
      {viewUser ? (
        <div className="main-box flex user-view">
          <h2>Donor Details</h2>
          <table>
            <tbody>
              <tr>
                <th>Full Name: </th>
                <td>{viewUser.first_name}</td>
              </tr>
              <tr>
                <th>Date of Birth: </th>
                <td>{viewUser.dob}</td>
              </tr>
              <tr>
                <th>Blood Type: </th>
                <td>
                  {viewUser.blood_group && viewUser.blood_group.toUpperCase()}
                </td>
              </tr>
              <tr>
                <th>Address: </th>
                <td>{districts[viewUser.district - 1]}</td>
              </tr>
              <tr>
                <th>Phone: </th>
                <td>{viewUser.phone}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => {
              console.log(viewUser.id);
              if (AuthCxt.auth) {
                dispatch(
                  requestBlood({ id: viewUser.id, token: AuthCxt.auth.access })
                ).then((res) => {
                  console.log(res);
                  navigate("/request/" + res.payload.id);
                });
              } else {
                navigate("/signup");
              }
            }}
          >
            Request
          </button>
          {!AuthCxt.auth && "Login Required"}
        </div>
      ) : (
        "loading"
      )}
    </main>
  );
};

export default ViewUser;
