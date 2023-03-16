import React from "react";
import Wrapper from "components/global/Wrapper";
import LogCharts from "components/logPage/LogCharts";
import LogTable from "components/logPage/LogTable";
import { useEffect } from "react"

// dummy data
import batches from "data/batches.json"

import "assets/styles/Log.scss"

export default function Log() {
  useEffect(() => {
    // this is where the batches data will be pulled from the API
  }, []);


  const addButtonClicked = () => {
    
  }

  return (
    <div className="log">
      <div>
        <input type="button" value="Add Milk Batch" className="add-btn" onClick={addButtonClicked}/>
      </div>
      <div>
        <Wrapper component={LogCharts} data={batches} header="Milk Production Stats" />
      </div>
      <div>
        <Wrapper component={LogTable} data={batches} header="Milk Log Table" />
      </div>
    </div>
  );
}
