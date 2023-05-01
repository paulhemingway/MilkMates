/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useListingService } from "services/ListingService";
import { Link } from "react-router-dom";
import Loading from "components/global/Loading";
import ListingItem from "components/listing/ListingItem";
import { useAuth } from "services/AuthService";

export default function DashFind() {
  const [listings, setListings] = useState([]);
  const { getAllListings } = useListingService();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    // need to wait for kermit to update the listings SQL query to get username
    const newListings = await getAllListings();
    if (newListings === null) {
      setError(true);
    } else {
      sortSliceSet(newListings);
    }
    setLoading(false);
  };

  const sortSliceSet = (newListings) => {
    newListings = newListings.filter((listing) => {
      return listing.username !== user.username;
    });
    setListings(newListings.slice(0,3));
  };

  return (
    <div className="dash-find">
      {loading && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {!loading && (
        <>
          {error ? (
            <p className="error-msg">
              There was a problem fetching recent listings. Please refresh the
              page.
            </p>
          ) : (
            <></>
          )}
          <h3>Recent Listings</h3>
          <div className="listings flex-column">
            {listings.map((listing, index) => {
              return <ListingItem listing={listing} key={index} />;
            })}
          </div>
          <Link to='/find' aria-label="View more listings" className="dash-btn button primary-button">View More</Link>
        </>
      )}
    </div>
  );
}
