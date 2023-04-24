import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListingService } from "services/ListingService";
import BatchInfo from "components/batch/BatchInfo";
import { useAuth } from "services/AuthService";
import Loading from "components/global/Loading";

export default function Listing() {
  const { listingId } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    getListing();
  }, []);

  const getListing = async () => {
    // this will turn into pulling from the API
    const newListing = dummyListing;

    await setListing(dummyListing);

    const newBatch = {
      batchId: newListing.batchId,
      productionDate: newListing.productionDate,
      volume: newListing.volume,
      caffeine: newListing.caffeine,
      sickness: newListing.sickness,
      medications: newListing.medications,
      vaccines: newListing.vaccines,
      diet: newListing.diet,
    };
    setBatch(newBatch);
    setLoading(false);
  };

  const dummyListing = {
    listingId: 39,
    userId: 7,
    title: "Here is batch 48.",
    description:
      "Selling this batch to a mother in need. Healthy production, no sicknesses or medications. COVID-19 Pfizer Booster vaccine. Did drink caffeine within 8 hours of producing.",
    price: 4.0,
    createdDateTime: "2023-04-23 20:17:08",
    batchId: 48,
    productionDate: "2023-04-20 14:04:05",
    volume: 5,
    diet: "Ketogenic,Low-Carb",
    sickness: "Common Cold,Flu",
    medications: "",
    caffeine: 1,
    vaccines: "COVID-19,Chickenpox",
    username: "pshfmg",
    status: "frozen",
  };

  return (
    <div className="listing">
      {loading && <Loading />}
      {listing !== null && (
        <>
          {batch !== null && <BatchInfo batch={batch} status={listing.status} />}
          
        </>
      )}
      {listing === null && !loading && <p>Couldn't retrieve listing.</p>}
    </div>
  );
}
