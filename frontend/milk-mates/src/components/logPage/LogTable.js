import React from "react";
import { useEffect, useState } from "react";

import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";

import LogTableRow from "./LogTableRow";

export default function LogTable({ data }) {
  const [displayedBatches, setDisplayedBatches] = useState([]);

  // this is to keep track of what's sorted.
  // 0 - none, 1 - descending, 2 - ascending
  // there will always be at least one '0' value
  const [sortValues, setSortValues] = useState({
    date: 0,
    status: 0,
  });

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    status: [],
    listed: null
  })

  // set data
  useEffect(() => {
    if (data) {
      setDisplayedBatches(data);
    }
  }, []);

  useEffect(() => {
    sortBatches();
  }, [sortValues]);

  const statusOrder = {
    'refrigerated': 1,
    'frozen': 2,
    'thawed': 3,
    'consumed': 4,
    'shared': 5,
    'discarded': 6,
  };

  function SortIcon({ value }) {
    switch (value) {
      case 0:
        return <FaSort />;
      case 1:
        return <FaSortDown />;
      case 2:
        return <FaSortUp />;
    }
  }

  const changeSort = (property) => {
    const prevValue = sortValues[property];

    const newSortValues = { ...sortValues };
    for (const prop in newSortValues) {
      newSortValues[prop] = 0;
    }

    newSortValues[property] = prevValue === 2 ? 0 : prevValue + 1;
    setSortValues(newSortValues);
  };

  // sort the array by this.
  const sortBatches = () => {
    if (sortValues.date !== 0) {
      let sorted = displayedBatches.slice().sort(
        (a, b) => new Date(b.productionDate) - new Date(a.productionDate)
      );
      setDisplayedBatches(sortValues.date === 1 ? sorted : sorted.reverse());
      return;
    }
    if (sortValues.status !== 0) {
      let sorted = displayedBatches.slice().sort(
        (a, b) => {
          console.log(a)
          console.log(b)
          return statusOrder[b.events[b.events.length - 1].event] - statusOrder[a.events[a.events.length - 1].event]
        }
      );
      setDisplayedBatches(sortValues.status == 1 ? sorted : sorted.reverse());
      return;
    }
    setDisplayedBatches(data);
  };

  return (
    <div className="log-table">
      <div className="inputs">
        
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th onClick={() => changeSort("date")} className="clickable">
                Date Produced <SortIcon value={sortValues.date} />
              </th>
              <th>Time</th>
              <th>Volume</th>
              <th onClick={() => changeSort("status")} className="clickable">
                Status <SortIcon value={sortValues.status} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* render a row for each batch */}
            {displayedBatches.length > 0 && displayedBatches.map((batch) => (
              <LogTableRow batch={batch} key={batch.batchId} />
            ))}
            {displayedBatches.length == 0 && 
              <tr className="empty-row">
                <td colSpan="5">There are no batches to display.</td>
              </tr> 
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
