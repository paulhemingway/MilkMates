import useDocumentTitle from "services/DocumentTitle";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "services/AuthService";

import "assets/styles/pages/Profile.scss";

import EditProfile from "components/profile/EditProfile";
import SellerRating from "components/profile/SellerRating";
import ChangePassword from "components/profile/ChangePassword";

export default function Profile() {
  // 1: edit profile
  // 2: Seller rating
  // 3: Change password
  const [tab, setTab] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const { userId } = useParams();

  useDocumentTitle(`${userId}'s Profile`);

  const { logout, getUserInfo, user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUserInfo = await getUserInfo(userId);
      setUserInfo(fetchedUserInfo);
    };
    fetchUser();
  }, [userId, getUserInfo]);

  // Define a new function that wraps tabKeyDown
  const tabKeyDown = (tabIndex) => (event) => {
    if (event.key === " " || event.key === "Enter") {
      if (tabIndex === 4) {
        logout();
        return;
      }
      // Your code for handling the key press here
      changeTab(tabIndex);
    }
  };

  const changeTab = (tabIndex) => {
    setTab(tabIndex);
  };

  function Content() {
    switch (tab) {
      case 1:
        return <EditProfile user={userInfo} />;
      case 2:
        return <SellerRating />;
      case 3:
        return <ChangePassword username={userInfo.username} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="profile">
      {userInfo !== null && user && (
        <>
          <div className="header">
            <AiOutlineUser />
            <h1>
              {userInfo.fName} {userInfo.LName}'s Profile
            </h1>
          </div>
          {userId === user.username && (
            <>
              <div className="tabs-cont">
                <ul className="tabs">
                  <li>
                    <div
                      className={tab === 1 ? "tab active" : "tab"}
                      tabIndex="0"
                      onKeyDown={tabKeyDown(1)}
                      onClick={() => changeTab(1)}
                    >
                      Edit Profile
                    </div>
                  </li>
                  <li>
                    <div
                      className={tab === 2 ? "tab active" : "tab"}
                      tabIndex="0"
                      onKeyDown={tabKeyDown(2)}
                      onClick={() => changeTab(2)}
                    >
                      Seller Rating
                    </div>
                  </li>
                  <li>
                    <div
                      className={tab === 3 ? "tab active" : "tab"}
                      tabIndex="0"
                      onKeyDown={tabKeyDown(3)}
                      onClick={() => changeTab(3)}
                    >
                      Change Password
                    </div>
                  </li>
                  <li>
                    <div
                      className="tab"
                      tabIndex="0"
                      onKeyDown={tabKeyDown(4)}
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </div>
              <div className="profile-content">
                <Content />
              </div>
            </>
          )}
          {userId !== user.username && (
            <div className="other-user">
              This isn't your profile. Seller rating information will go here
              eventually. Here's all I'll give you: this user's zip code is{" "}
              {userInfo.zipCode}
              <div className="buttons">
                <button>Message</button>
                <button>Leave a Review</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
