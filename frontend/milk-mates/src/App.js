import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "contexts/AuthProvider";
import { useAuth } from "contexts/AuthProvider";
import Landing from "pages/Landing";
import Layout from "components/global/Layout";
import Dashboard from "pages/Dashboard";
import NoPage from "pages/NoPage";
import Help from "pages/FAQ";
import Terms from "pages/Terms";
import Log from "pages/Log";
import Share from "pages/Share";
import Resources from "pages/Resources";
import Find from "pages/Find";
import Messages from "pages/Messages";
import Profile from "pages/Profile";
import Batch from "pages/Batch";
import PrivateRoute from "./components/global/PrivateRoute";
import "assets/styles/global.scss";

function App() {
  // must get token on load eventually and redirect if it's valid


  const { loggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
      <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Landing />
              )
            }
          />

        {/* everything within here will have the navbar */}
        <Route element={<Layout />}>
          <Route
            path="dashboard"
            element={<PrivateRoute component={<Dashboard />} loggedIn={loggedIn} />}
          />
          <Route
            path="log"
            element={<PrivateRoute component={<Log />} loggedIn={loggedIn} />}
          />
          <Route
            path="share"
            element={<PrivateRoute component={<Share />} loggedIn={loggedIn} />}
          />
          <Route
            path="find"
            element={<PrivateRoute component={<Find />} loggedIn={loggedIn} />}
          />
          <Route
            path="messages"
            element={<PrivateRoute component={<Messages />} loggedIn={loggedIn} />}
          />
          <Route
            path="resources"
            element={<PrivateRoute component={<Resources />} loggedIn={loggedIn} />}
          />
          <Route
            path="/profile/:userId"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Profile />} />
            }
          />
          <Route
            path="/batch/:batchId"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Batch />} />
            }
          />
        </Route>

        <Route path="help" element={<Help />} />
        <Route path="tos" element={<Terms />} />
        {/* this path value points to all other paths. It's for the 404 not found page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
