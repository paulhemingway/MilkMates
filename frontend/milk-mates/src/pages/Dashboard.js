import useDocumentTitle from "services/DocumentTitle";
import React from "react";
import DashWrapper from "components/dashboard/DashWrapper";
import DashLog from "components/dashboard/DashLog";
import DashShare from "components/dashboard/DashShare";

import "assets/styles/pages/Dashboard.scss";

export default function Dashboard(props) {
  useDocumentTitle(props.title);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <DashWrapper header="Recent Batches" path="/log">
          <DashLog />
        </DashWrapper>
        <DashWrapper header="Your Latest Listing" path="/share">
          <DashShare />
        </DashWrapper>
      </div>
    </div>
  );
}
