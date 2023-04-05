import React from "react";
import Wrapper from "components/global/Wrapper";
import LogCharts from "components/logPage/LogCharts";
import LogTable from "components/logPage/LogTable";
import { useEffect } from "react";
import AddBatch from "components/logPage/AddBatch";

import { HiPlus } from "react-icons/hi";

// dummy data
import batches from "data/batches.json";

import "assets/styles/Log.scss";
import useDocumentTitle from "contexts/DocumentTitle";

export default function Log(props) {
  useDocumentTitle(props.title)
  useEffect(() => {
    // this is where the batches data will be pulled from the API
  }, []);

  const addBatchClicked = () => {};

  return (
    <div className="log">
      <div>
        <AddBatch />
      </div>
      <div>
        <Wrapper header="Milk Production Stats">
          <LogCharts data={batches} />
        </Wrapper>
      </div>
      <div>
        <Wrapper header="Milk Log">
          <LogTable data={batches} />
        </Wrapper>
      </div>
    </div>
  );
}
