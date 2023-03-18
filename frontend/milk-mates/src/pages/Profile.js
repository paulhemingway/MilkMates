import React from "react";
import { useParams } from "react-router-dom";

export default function Profile(props) {
  const { userId } = useParams();
  
  return (
    <div>
      {userId}'s profile <p>Profile page</p>
    </div>
  );
}
