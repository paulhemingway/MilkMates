import Landing from "pages/Landing";
import Layout from "components/global/Layout";
import Dashboard from "pages/Dashboard";
import NoPage from "pages/NoPage";
import Help from "pages/Help";
import Terms from "pages/Terms";
import Log from "pages/Log";
import Share from "pages/Share";
import Resources from "pages/Resources";
import Find from "pages/Find";
import Messages from "pages/Messages";
import Batch from "pages/Batch";

import PrivateRoute from "./components/global/PrivateRoute";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/global.scss";
import Profile from "pages/Profile";


function App() {
  // this will eventually have to get the authentication token somewhere
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />

        {/* everything within here will have the navbar */}
        <Route element={<Layout />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Dashboard />} />
            }
          />
          <Route
            path="log"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Log />} />
            }
          />
          <Route
            path="share"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Share />} />
            }
          />
          <Route
            path="find"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Find />} />
            }
          />
          <Route
            path="messages"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Messages />} />
            }
          />
          <Route
            path="resources"
            element={
              <PrivateRoute loggedIn={loggedIn} component={<Resources />} />
            }
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
