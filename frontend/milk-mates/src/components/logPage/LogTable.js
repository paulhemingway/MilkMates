/* eslint-disable */
import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";

import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { HiPlus } from "react-icons/hi";

import LogTableRow from "./LogTableRow";
import FilterMenu from "./FilterMenu";

export default function LogTable({ data }) {
  const [displayedBatches, setDisplayedBatches] = useState([]);
  const [filterMenuShowing, setFilterMenuShowing] = useState(false);

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    status: [],
    listed: null,
  });

  const toggleFilterMenuShowing = () => {
    setFilterMenuShowing(!filterMenuShowing);
  };

  const sortOptions = [
    {
      value: "0",
      label: (
        <div className="option">
          <span>Date</span>
          <TbSortDescending />
        </div>
      ),
    },
    {
      value: "1",
      label: (
        <div className="option">
          <span>Date</span>
          <TbSortAscending />
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div className="option">
          <span>Volume</span>
          <TbSortDescending />
        </div>
      ),
    },
    {
      value: "3",
      label: (
        <div className="option">
          <span>Volume</span>
          <TbSortAscending />
        </div>
      ),
    },
  ];

  // set data
  useEffect(() => {
    if (data) {
      setDisplayedBatches(data);
    }
  }, [data]);

  const statusOrder = {
    refrigerated: 1,
    frozen: 2,
    thawed: 3,
    consumed: 4,
    shared: 5,
    discarded: 6,
  };

  const changeSort = (property) => {

  };

  // sort the array
  const sortBatches = () => {
    
  };

  // filter the array
  const filterBatches = () => {

  }

  return (
    <div className="log-table">
      <div className="inputs">
        <div className="input sort-input">
          <label htmlFor="sort-select">Sort</label>
          <Select
            options={sortOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
            defaultValue={sortOptions[0]}
            inputId="sort-select"
            className="select-dropdown"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                text: "orangered",
                primary25: "var(--light-pink)",
                primary: "var(--blue)",
              },
            })}
            isSearchable={false}
          />
        </div>
        <div className="input filter-input">
          <label htmlFor="filters">Filter</label>
          <button
            id="filters"
            onClick={toggleFilterMenuShowing}
            className={`add-filters-btn ${filterMenuShowing ? "active" : ""}`}
          >
            Add Filters
            <HiPlus />
          </button>
          {filterMenuShowing && <FilterMenu />}
        </div>
        <div className="set-filters">

        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th onClick={() => changeSort("date")}>
                Date Produced
              </th>
              <th>Volume</th>
              <th onClick={() => changeSort("status")}>
                Status
              </th>
              <th>Listed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* render a row for each batch */}
            {displayedBatches.length > 0 &&
              displayedBatches.map((batch) => (
                <LogTableRow batch={batch} key={batch.batchId} />
              ))}
            {displayedBatches.length === 0 && (
              <tr className="empty-row">
                <td colSpan="5">There are no batches to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
