import React from "react";
import Wrapper from "components/global/Wrapper";
import LogCharts from "components/logPage/LogCharts";
import LogTable from "components/logPage/LogTable";
import { useEffect } from "react";

import { HiPlus } from "react-icons/hi"

// dummy data
import batches from "data/batches.json";

import "assets/styles/Log.scss";

export default function Log() {
  useEffect(() => {
    // this is where the batches data will be pulled from the API
  }, []);

  const addButtonClicked = () => {};

  return (
    <div className="log">
      <div>
        <button className="add-btn" onClick={addButtonClicked}>
          <HiPlus />
          Add Milk
        </button>
      </div>
      <div>
        <Wrapper
          component={LogCharts}
          data={batches}
          header="Milk Production Stats"
        />
      </div>
      <div>
        <Wrapper component={LogTable} data={batches} header="Milk Log" />
      </div>
    </div>
  );
}
