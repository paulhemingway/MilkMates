import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "services/AuthService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
import Privacy from "pages/Privacy";
import Batch from "pages/Batch";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "router/AdminRoute";
import "assets/styles/global/global.scss";
import Listing from "pages/Listing";
import UsersAdmin from "pages/admin/UsersAdmin";
import ListingsAdmin from "pages/admin/ListingsAdmin";

function App() {
  // must get token on load eventually and redirect if it's valid

  useEffect(() => {}, []);

  const { loggedIn, user } = useAuth();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Landing title="Welcome" />
              )
            }
          />

          {/* everything within here will have the navbar */}
          <Route element={<Layout />}>
            <Route
              path="dashboard"
              element={
                <PrivateRoute
                  component={<Dashboard title="Dashboard" />}
                  loggedIn={loggedIn} user={user} 
                />
              }
            />
            <Route
              path="log"
              element={
                <PrivateRoute
                  component={<Log title="Milk Log" />}
                  loggedIn={loggedIn} user={user} 
                />
              }
            />
            <Route
              path="share/:batchId?"
              element={
                <PrivateRoute
                  component={<Share title="Share Milk" />}
                  loggedIn={loggedIn} user={user} 
                />
              }
            />
            <Route
              path="find"
              element={
                <PrivateRoute
                  component={<Find title="Find Milk" />}
                  loggedIn={loggedIn} user={user} 
                />
              }
            />
            <Route
              path="messages"
              element={
                <PrivateRoute
                  component={<Messages title="Messages" />}
                  loggedIn={loggedIn} user={user} 
                />
              }
            />
            <Route
              path="resources"
              element={
                <PrivateRoute
                  component={<Resources title="Resources" />}
                  loggedIn={loggedIn} user={user} 
                />
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <PrivateRoute loggedIn={loggedIn} user={user}  component={<Profile />} />
              }
            />
            <Route
              path="/log/batch/:batchId"
              element={
                <PrivateRoute loggedIn={loggedIn} user={user}  component={<Batch />} />
              }
            />
            <Route
              path="/share/listing/:listingId"
              element={
                <PrivateRoute loggedIn={loggedIn} user={user}  component={<Listing />} />
              }
            />
            <Route
              path="/find/listing/:listingId"
              element={
                <PrivateRoute loggedIn={loggedIn} user={user}  component={<Listing />} />
              }
            />
            <Route
              path="/find/listing/:listingId"
              element={
                <PrivateRoute loggedIn={loggedIn} user={user}  component={<Listing />} />
              }
            />
            <Route
              path="/adminUsers"
              element={
                <AdminRoute user={user}  component={<UsersAdmin />} />
              }
            />
            <Route
              path="/adminListings"
              element={
                <AdminRoute user={user}  component={<ListingsAdmin />} />
              }
            />
          </Route>

          <Route path="help" element={<Help title="FAQ" />} />
          <Route path="tos" element={<Terms title="Terms of Service" />} />
          <Route path="privacy" element={<Privacy title="Privacy Policy" />} />

          {/* this path value points to all other paths. It's for the 404 not found page */}
          <Route path="*" element={<NoPage title="Page Not Found" />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
