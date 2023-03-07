import React from "react";
import { useParams } from "react-router-dom";

export default function Profile(props) {
  const { id } = useParams();
  return (
    <div>
      {id}'s profile <p>Profile page</p>
    </div>
  );
}
