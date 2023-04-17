import useDocumentTitle from "services/DocumentTitle";
import React, {useState, useEffect} from "react";
import Wrapper from "components/global/Wrapper";
import { useBatchService } from "services/BatchService";

export default function Share(props) {
  const [notListed, setNotListed] = useState([]);

  useDocumentTitle(props.title);
  const { batches } = useBatchService();
  
  useEffect(() => {
    const batchesNotListed = batches.filter((batch) => {
      return batch.isListed === 0
    })
    setNotListed(batchesNotListed)
  }, [batches])
  return (
    <div className="share">
      <h1>Share Milk</h1>
      <Wrapper header="Create A Listing"></Wrapper>
      <Wrapper header="My Listings"></Wrapper>
    </div>
  );
}
