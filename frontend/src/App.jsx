import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";
import ViewUser from "./pages/ViewUser";
import LookFor from "./pages/LookFor";
import RequestDetail from "./pages/RequestDetail";
import UserPage from "./pages/UserPage";
import UserRequestsPage from "./pages/UserRequestsPage";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="user/:id" element={<ViewUser />} />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <UserPage />
                </PrivateRoute>
              }
            />
            <Route path="search" element={<LookFor />} />
            <Route
              path="request/:id"
              element={
                <PrivateRoute>
                  <RequestDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="requests"
              element={
                <PrivateRoute>
                  <UserRequestsPage />{" "}
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
