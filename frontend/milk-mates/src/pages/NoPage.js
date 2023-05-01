import useDocumentTitle from "services/DocumentTitle";
import React from "react";
import { Link } from "react-router-dom";
import Header from "components/global/Header";

export default function NoPage(props) {
  useDocumentTitle(props.title);
  return (
    <div className="not-found">
      <Header isAtLanding={true} />
      <div className="not-found-content">
        <h1>OOPS! Page Not Found.</h1>
        <Link to="/" className="back button primary-button-blue">
          Go back
        </Link>
      </div>
    </div>
  );
}
