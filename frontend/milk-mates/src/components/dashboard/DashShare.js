import React, { useState, useEffect } from "react";
import { useListingService } from "services/ListingService";
import ListingItem from "components/listing/ListingItem";
import Loading from "components/global/Loading";
import { Link } from "react-router-dom";

export default function DashShare() {
  const { userListings } = useListingService();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userListings) setLoading(false);
  }, [userListings]);

  return (
    <div className="dash-share">
      {loading && <Loading />}
      {userListings.length > 0 && (
        <ListingItem listing={userListings[0]} isOwn={true} />
      )}
      {userListings.length === 0 && (<p>You do not have any active breastmilk listings.</p>)}
      <Link to="/share" className="create-btn button primary-button-blue">Create A Listing</Link>
    </div>
  );
}
