import useDocumentTitle from "services/DocumentTitle";
import React from "react";
import Wrapper from "components/global/Wrapper";
import CreateListing from "components/listing/CreateListing";

import "assets/styles/pages/Share.scss"


export default function Share(props) {
  
  useDocumentTitle(props.title);
  return (
    <div className="share">
      <h1>Share Milk</h1>
      <Wrapper header="Create A Listing">
        <CreateListing />
      </Wrapper>
      <Wrapper header="My Listings"></Wrapper>
    </div>
  );
}
