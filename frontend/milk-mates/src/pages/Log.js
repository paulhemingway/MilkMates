import React from "react";
import Wrapper from "components/global/Wrapper";
import LogCharts from "components/logPage/LogCharts";
import LogTable from "components/logPage/LogTable";
import { useEffect } from "react";
import AddBatch from "components/logPage/AddBatch";
import { batchService } from "services/BatchService";

import "assets/styles/pages/Log.scss";
import useDocumentTitle from "services/DocumentTitle";

export default function Log(props) {

  const {batches} = batchService();
  useDocumentTitle(props.title)
  useEffect(() => {
    // this is where the batches data will be pulled from the API
  }, []);

  return (
    <div className="log">
      <h1>Milk Log</h1>
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
