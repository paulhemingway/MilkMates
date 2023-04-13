import useDocumentTitle from "services/DocumentTitle";
import React from "react";
import { Link } from "react-router-dom";

export default function NoPage(props) {
  useDocumentTitle(props.title)
  return (
    <div>
      Error 404! Page not found.
      <br></br>
      <Link to="/">Go back</Link>
    </div>
  );
}
