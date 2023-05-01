import useDocumentTitle from "services/DocumentTitle";
import React, { useState } from "react";
import Wrapper from "components/global/Wrapper";
import FindListings from "components/listing/FindListings";

import "assets/styles/pages/Listing.scss";
import FindFilter from "components/listing/FindFilter";

export default function Find(props) {
  const [filters, setFilters] = useState({
    earliest: null,
    freeOnly: false,
    noCaffeine: false,
    volume: 0,
    zipCode: "",
    sickness: [],
    medications: [],
    vaccines: [],
    diets: [],
  });

  useDocumentTitle(props.title);
  
  return (
    <div className="find flex-column">
      <h1>Find Milk</h1>
      <FindFilter setFilters={setFilters} />
      <Wrapper header="Listings">
        <FindListings filters={filters} />
      </Wrapper>
    </div>
  );
}
