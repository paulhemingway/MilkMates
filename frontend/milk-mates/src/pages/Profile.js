import useDocumentTitle from "contexts/DocumentTitle";
import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  useDocumentTitle(`${userId}'s Profile`)
  
  return (
    <div>
      {userId}'s profile <p>Profile page</p>
    </div>
  );
}
