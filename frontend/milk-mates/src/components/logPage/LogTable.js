/* eslint-disable */
import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { HiPlus } from "react-icons/hi";

import LogTableRow from "./LogTableRow";
import FilterMenu from "./FilterMenu";
import Pagination from "components/global/Pagination";
import ClearableFilter from "./ClearableFilter";

export default function LogTable({ data }) {
  // state after applying sort and filters
  const [sortedBatches, setSortedBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [sortCode, setSortCode] = useState(0);

  // state for pagination
  const [displayedBatches, setDisplayedBatches] = useState([]);
  const [filterMenuShowing, setFilterMenuShowing] = useState(false);
  const [perPage, setPerPage] = useState(5);

  const [filters, setFilters] = useState({
    dateRange: null,
    status: [],
    listed: null,
  });

  const hideFilterMenu = () => {
    setFilterMenuShowing(false);
  };

  const showFilterMenu = () => {
    setFilterMenuShowing(true);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters)
  };

  const applyFilters = (newFilters) => {
    let newArray = [...data];

    if (newFilters.dateRange) {
      let startDate = new Date();
      switch (newFilters.dateRange) {
        case "Today":
          break;
        case "Past week":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "Past month":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "Past 3 months":
          startDate.setMonth(startDate.getMonth() - 3);
          break;
        case "Past year":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          break;
      }
      newArray = newArray.filter((batch) => {
        return new Date(batch.productionDate) >= startDate;
      });
      
    }

    if (newFilters.status.length > 0) {
      newArray = newArray.filter((batch) => {
        const n = batch.events.length;
        return newFilters.status.includes(batch.events[n - 1].event);
      });
    }

    if(newFilters.listed !== null) {
      newArray = newArray.filter((batch) => {
        return newFilters.listed === batch.isListed
      })
    }

    setFilteredBatches(newArray);
    hideFilterMenu()
  };

  const clearFilter = (type, value) => {
    let newFilters = {...filters}
    value = value.toLowerCase()
    type = type.toLowerCase()

    switch(type) {
      case "date":
        newFilters.dateRange = null;
        break;
      case "status":
        let index = newFilters.status.indexOf(value)
        if(index !== -1) {
          newFilters.status.splice(index, 1)
        }
        break;
      case "listed":
        newFilters.listed = null;
        break;
    }

    updateFilters(newFilters)
  }

  const sortOptions = [
    {
      value: 0,
      label: (
        <div className="option">
          <span aria-label="Date Ascending">Date</span>
          <TbSortAscending />
        </div>
      ),
    },
    {
      value: 1,
      label: (
        <div className="option">
          <span aria-label="Date Descending">Date</span>
          <TbSortDescending />
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div className="option">
          <span aria-label="Volume Ascending">Volume</span>
          <TbSortAscending />
        </div>
      ),
    },
    {
      value: 3,
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
      ),
    },
    {
      value: 5,
      label: (
        <div className="option">
          <span>5</span>
        </div>
      ),
    },
    {
      value: 10,
      label: (
        <div className="option">
          <span>10</span>
        </div>
      ),
    },
    {
      value: 15,
      label: (
        <div className="option">
          <span>15</span>
        </div>
      ),
    },
  ];

  // set data
  useEffect(() => {
    if (data) {
      setSortedBatches(data);
      setFilteredBatches(data);
    }
  }, [data]);

  useEffect(() => {
    updateDisplayedBatches(0, perPage);
  }, [sortedBatches, perPage]);

  function updateDisplayedBatches(start, end) {
    if (sortedBatches.length > 0) {
      setDisplayedBatches([...sortedBatches].slice(start, end));
    } else {
      setDisplayedBatches([...data].slice(start, end));
    }
  }

  const onSortChanged = (selected) => {
    setSortCode(selected.value);
  };

  useEffect(() => {
    sortBatches();
  }, [filteredBatches, sortCode]);

  // sort the array
  const sortBatches = () => {
    let newBatches = [...filteredBatches];
    switch (sortCode) {
      // date desc
      case 0:
        newBatches.sort(
          (a, b) => new Date(a.productionDate) - new Date(b.productionDate)
        );
        break;
      // date asc
      case 1:
        newBatches.sort(
          (a, b) => new Date(b.productionDate) - new Date(a.productionDate)
        );
        break;
      // volume desc
      case 2:
        newBatches.sort((a, b) => a.volume - b.volume);
        break;
      // volume asc
      case 3:
        newBatches.sort((a, b) => b.volume - a.volume);
        break;
      default:
        break;
    }
    setSortedBatches(newBatches);
    updateDisplayedBatches(0, perPage);
  };

  const perPageSelected = (selected) => {
    setPerPage(selected.value);
  };

  return (
    <div className="log-table">
      <div className="inputs">
        <div className="input filter-input">
          <label htmlFor="filters">Filters</label>
          <button
            id="filters"
            onClick={showFilterMenu}
            className={`add-filters-btn ${filterMenuShowing ? "active" : ""}`}
          >
            Filters
            <HiPlus />
          </button>
          {filterMenuShowing && (
            <FilterMenu
              close={hideFilterMenu}
              filters={filters}
              updateFilters={updateFilters}
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
            onChange={onSortChanged}
          />
        </div>
        <div className="input perpage-input">
          <label htmlFor="perpage-select">Per Page</label>
          <Select
            options={perPageOptions}
            components={{
              IndicatorSeparator: () => null,
            }}
            defaultValue={perPageOptions[1]}
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
        
      </div>
      <div className="set-filters">
          {
            filters.dateRange && 
            <ClearableFilter type="Date" value={filters.dateRange} clear={clearFilter}/>
          }
          {
            filters.status.length > 0 &&
            filters.status.map((stat) => {
              return <ClearableFilter type="Status" value={stat.charAt(0).toUpperCase() + stat.slice(1)} clear={clearFilter} key={stat}/>
            })
          }
          {
            filters.listed !== null &&
            <ClearableFilter type="Listed" value={filters.listed ? 'Yes' : 'No'} clear={clearFilter} />
          }

      </div>
      <div className="table">
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
      <Pagination
        length={filteredBatches.length}
        perPage={perPage}
        update={updateDisplayedBatches}
      />
    </div>
  );
}
