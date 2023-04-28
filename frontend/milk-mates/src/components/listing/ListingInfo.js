import React, { useState, useEffect } from "react";
import { TbBottle } from "react-icons/tb";
import moment from "moment";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useAuth } from "services/AuthService";
import { Link } from "react-router-dom";
import { useModalService } from "services/ModalService";
import DeleteListing from "components/modal/DeleteListing";

export default function ListingInfo({ listing }) {
  const [emailShowing, setEmailShowing] = useState(false);
  const [phoneShowing, setPhoneShowing] = useState(false);
  const { user, getUserInfo } = useAuth();
  const {openModal} = useModalService()
  const isOwn = user.username === listing.username;

  const createdDate = new Date(listing.createdDateTime)

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getSeller();
  }, [listing]);

  const getSeller = async () => {
    const seller = await getUserInfo(listing.username);
    setEmail(seller.email);
    setPhone(seller.phone);
  };

  const removeClicked = (e) => {
    e.stopPropagation();
    openModal(<DeleteListing listing={listing} isAdmin={user.isAdmin} />)
  };

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, ""); // remove all non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // match the cleaned string to 3-3-4 digit pattern

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3]; // concatenate with appropriate characters
    }

    return null; // return null if the input string is invalid
  }

  console.log(listing);
  return (
    <div className="listing-info two-col">
      <div className="listing-content">
        <div className="posted">
          <Link to={`/profile/${listing.username}`}>{listing.username}</Link>
          <p>{moment(createdDate).format("LLLL")} - {moment(createdDate).fromNow()}</p>
        </div>
        <div className="title-desc">
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
        </div>
        <div className="two-col">
          <div className="price">
            <h3>Price</h3>
            <p>
              {listing.price == 0.0 ? "Free!" : "$" + listing.price.toFixed(2)}
            </p>
          </div>
          <div className="zip">
            <h3>Zip Code</h3>
            <p>{listing.zipCode}</p>
          </div>
        </div>
        {!isOwn && (
          <div className="contact">
            <h3>Reply</h3>
            <div className="buttons">
              {listing.showEmail && (
                <div className="email">
                  <button
                    aria-label="Toggle email address"
                    onClick={() => setEmailShowing(!emailShowing)}
                  >
                    <HiOutlineMail />
                    Email
                    {emailShowing ? <BiChevronUp /> : <BiChevronDown />}
                  </button>
                  {emailShowing && (
                    <a
                      href={`mailto:${email}?subject=Listing%20${listing.listingId}`}
                      className="contact-popup"
                    >
                      {email}
                    </a>
                  )}
                </div>
              )}
              {listing.showPhone && (
                <div className="phone">
                  <button
                    aria-label="Toggle Phone number"
                    onClick={() => setPhoneShowing(!phoneShowing)}
                  >
                    <HiPhone />
                    Phone
                    {phoneShowing ? <BiChevronUp /> : <BiChevronDown />}
                  </button>
                  {phoneShowing && (
                    <a className="contact-popup" href={`tel:${phone}`}>
                      {formatPhoneNumber(phone)}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {(!isOwn || user.isAdmin === 1) && (
          <button className="button primary-button-red" onClick={removeClicked}>
            Remove Listing
          </button>
        )}
      </div>

      <TbBottle className="bottle" />
    </div>
  );
}
