import React from "react";
import Wrapper from "components/global/Wrapper";
import LogCharts from "components/logPage/LogCharts";
import LogTable from "components/logPage/LogTable";
import { useEffect } from "react";

import { HiPlus } from "react-icons/hi";

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
        <button
          className="button primary-button add-btn"
          onClick={addButtonClicked}
        >
          <HiPlus />
          Add Milk
        </button>
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
