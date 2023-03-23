/* eslint-disable */
import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { HiPlus } from "react-icons/hi";

import LogTableRow from "./LogTableRow";
import FilterMenu from "./FilterMenu";
import Pagination from "components/global/Pagination";

export default function LogTable({ data }) {
  // state after applying sort and filters
  const [sortedAndFiltered, setSortedAndFiltered] = useState([]);

  // state for pagination
  const [displayedBatches, setDisplayedBatches] = useState([]);
  const [filterMenuShowing, setFilterMenuShowing] = useState(false);

  const [perPage, setPerPage] = useState(3)

  const [filters, setFilters] = useState({
    dateRange: null,
    status: [],
    listed: null,
  });

  const hideFilterMenu = () => {
    setFilterMenuShowing(false);
  };

  const showFilterMenu = () => {
    setFilterMenuShowing(true)
  }

  const sortOptions = [
    {
      value: "0",
      label: (
        <div className="option">
          <span aria-label="Date Ascending">Date</span>
          <TbSortAscending />
        </div>
      ),
    },
    {
      value: "1",

      label: (
        <div className="option">
          <span aria-label="Date Descending">Date</span>
          <TbSortDescending />
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div className="option">
          <span aria-label="Volume Ascending">Volume</span>
          <TbSortAscending />
        </div>
      ),
    },
    {
      value: "3",

      label: (
        <div className="option">
          <span aria-label="Volume Descending">Volume</span>
          <TbSortDescending />
        </div>
      ),
    },
  ];

  const perPageOptions = [
    {
      value: 3,
      label: (
        <div className="option">
          <span>3</span>
        </div>
      )
    },
    {
      value: 5,
      label: (
        <div className="option">
          <span>5</span>
        </div>
      )
    },
    {
      value: 10,
      label: (
        <div className="option">
          <span>10</span>
        </div>
      )
    },
    {
      value: 15,
      label: (
        <div className="option">
          <span>15</span>
        </div>
      )
    },
  ]

  // set data
  useEffect(() => {
    if (data) {
      setSortedAndFiltered(data);
    }
  }, [data]);

  useEffect(() => {
    updateDisplayedBatches(0, perPage)
  }, [sortedAndFiltered, perPage])

  const updateDisplayedBatches = (start, end) => {
    setDisplayedBatches([...sortedAndFiltered].slice(start, end))
  }

  // sort the array
  const sortBatches = (selected) => {
    let newBatches = [...sortedAndFiltered];
    switch (selected.value) {
      // date desc
      case "0":
        newBatches.sort(
          (a, b) => new Date(a.productionDate) - new Date(b.productionDate)
        );
        break;
      // date asc
      case "1":
        newBatches.sort(
          (a, b) => new Date(b.productionDate) - new Date(a.productionDate)
        );
        break;
      // volume desc
      case "2":
        newBatches.sort((a, b) => a.volume - b.volume);
        break;
      // volume asc
      case "3":
        newBatches.sort((a, b) => b.volume - a.volume);
        break;
      default:
        break;
    }
    console.log(newBatches);
    setSortedAndFiltered(newBatches);
  };

  // filter the array
  const filterBatches = () => {};

  const perPageSelected = (selected) => {
    setPerPage(selected.value)
  }

  return (
    <div className="log-table">
      <div className="inputs">
        <div className="input filter-input">
          <label htmlFor="filters">Filter</label>
          <button
            id="filters"
            onClick={showFilterMenu}
            className={`add-filters-btn ${filterMenuShowing ? "active" : ""}`}
          >
            Add Filters
            <HiPlus />
          </button>
          {filterMenuShowing && (
            <FilterMenu
              close={hideFilterMenu}
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </div>
        <div className="input sort-input">
          <label htmlFor="sort-select">Sort</label>
          <Select
            options={sortOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
            defaultValue={sortOptions[0]}
            inputId="sort-select"
            classNamePrefix="select-dropdown"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "var(--light-pink)",
                primary: "var(--blue)",
              },
            })}
            isSearchable={false}
            onChange={sortBatches}
          />
        </div>
        <div className="input perpage-input">
          <label htmlFor="perpage-select">Per Page</label>
          <Select
            options={perPageOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
            defaultValue={perPageOptions[0]}
            inputId="perpage-select"
            classNamePrefix="perpage-dropdown"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "var(--light-pink)",
                primary: "var(--blue)",
              },
            })}
            isSearchable={false}
            onChange={perPageSelected}
          />
        </div>

        <div className="set-filters"></div>
      </div>
      <div className="table">
        <Pagination length={sortedAndFiltered.length} perPage={perPage}/>
        <table>
          <thead>
            <tr>
              <th onClick={() => changeSort("date")}>Date Produced</th>
              <th>Volume</th>
              <th onClick={() => changeSort("status")}>Status</th>
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
