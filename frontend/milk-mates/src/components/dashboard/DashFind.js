import React, { useState, useEffect } from "react";
import { useListingService } from "services/ListingService";
import { Link } from "react-router-dom";
import Loading from "components/global/Loading";

export default function DashFind() {
  const [listings, setListings] = useState([]);
  const { getAllListings } = useListingService();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    // need to wait for kermit to update the listings SQL query to get username
    const newListings = await getAllListings();
    if (newListings === null) {
      setError(true);
    } else {
      setListings(newListings);
    }
    setLoading(false);
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
          <Link></Link>
        </>
      )}
    </div>
  );
}
