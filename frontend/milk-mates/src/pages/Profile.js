import useDocumentTitle from "services/DocumentTitle";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import "assets/styles/Profile.scss";

export default function Profile() {
  // 1: edit profile
  // 2: health info
  // 3: Seller rating
  // 4: Change password
  const [tab, setTab] = useState(1);
  const { userId } = useParams();

  useDocumentTitle(`${userId}'s Profile`);

  const user = {
    LName: "Hemingway",
    addedDateTime: "2023-04-10T20:47:07.000Z",
    email: "paul@paul.com",
    fName: "Paul",
    isActive: 1,
    isAdmin: 0,
    lastActiveTime: null,
    password:
      "444ac1a9fe1f282503e82a73765095c407a35f68c1afc78e27c710161412e4b2",
    phone: "8166543348",
    userid: 7,
    username: "pshfmg",
    zipCode: "65203",
  };

  return (
    <div className="profile">
      <div className="header">
        <AiOutlineUser />
        <h1>
          {user.fName} {user.LName}'s Profile
        </h1>
      </div>
      <div className="tabs-cont">
        <ul className="tabs">
          <li>
            <div className="tab active" tabIndex="0">Edit Profile</div>
          </li>
          <li>
            <div className="tab" tabIndex="0">Health Info</div>
          </li>
          <li>
            <div className="tab" tabIndex="0">Seller Rating</div>
          </li>
          <li>
            <div className="tab" tabIndex="0">Change Password</div>
          </li>
          <li>
            <div className="tab" tabIndex="0">Logout</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
