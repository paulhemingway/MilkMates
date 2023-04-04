import React, { useState, useEffect } from "react";
import Select from "react-select";
import FocusTrap from "focus-trap-react";

export default function FilterMenu(props) {
  const [dateRange, setDateRange] = useState(props.filters.dateRange);
  const [status, setStatus] = useState(props.filters.status);
  const [listed, setListed] = useState(props.filters.listed);

  useEffect(() => {
    populateInputs();
  }, []);

  const startDateOptions = [
    {
      value: null,
      label: (
        <div className="option">
          <span>None</span>
        </div>
      ),
    },
    {
      value: "Today",
      label: (
        <div className="option">
          <span>Today</span>
        </div>
      ),
    },
    {
      value: "Past week",
      label: (
        <div className="option">
          <span>Past week</span>
        </div>
      ),
    },
    {
      value: "Past month",
      label: (
        <div className="option">
          <span>Past month</span>
        </div>
      ),
    },
    {
      value: "Past 3 months",
      label: (
        <div className="option">
          <span>Past 3 months</span>
        </div>
      ),
    },
    {
      value: "Past year",
      label: (
        <div className="option">
          <span>Past year</span>
        </div>
      ),
    },
  ];

  const statusOptions = [
    "Logged",
    "Refrigerated",
    "Frozen",
    "Thawed",
    "Consumed",
    "Shared",
    "Discarded",
  ];

  const listedOptions = [
    {
      value: null,
      label: (
        <div className="option">
          <span>All</span>
        </div>
      ),
    },
    {
      value: true,
      label: (
        <div className="option">
          <span>Listed</span>
        </div>
      ),
    },
    {
      value: false,
      label: (
        <div className="option">
          <span>Not Listed</span>
        </div>
      ),
    },
  ];

  const dateDefaultIndex = startDateOptions.findIndex(
    (option) => option.value === props.filters.dateRange
  );
  const listedDefaultIndex = listedOptions.findIndex(
    (option) => option.value === props.filters.listed
  );

  const populateInputs = () => {
    props.filters.status.map((stat) => {
      console.log(stat);
      let statusCheck = document.getElementById(
        stat.charAt(0).toUpperCase() + stat.slice(1)
      );
      if (statusCheck) {
        statusCheck.checked = true;
      }
    });
  };

  const cancel = () => {
    props.close();
  };

  const apply = () => {
    const filters = {
      dateRange: dateRange,
      status: status,
      listed: listed,
    };

    props.updateFilters(filters);
  };

  const dateRangeChanged = (selected) => {
    setDateRange(selected.value);
  };

  const onStatusChange = (e) => {
    let newStatus = [...status];
    if (e.target.checked) {
      newStatus.push(e.target.value.toLowerCase());
    } else {
      newStatus = newStatus.filter(
        (item) => item !== e.target.value.toLowerCase()
      );
    }

    setStatus(newStatus);
  };

  const onListedChange = (selected) => {
    setListed(selected.value);
  };

  return (
    <div>
      <FocusTrap>
        <div className="filter-menu">
          <h3>Filters</h3>
          <div className="filter-menu__option date">
            <label htmlFor="date-range">Date Range</label>
            <Select
              options={startDateOptions}
              defaultValue={startDateOptions[dateDefaultIndex]}
              className="date-range-select"
              id="date-range"
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder="Date Range"
              isSearchable={false}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              onChange={dateRangeChanged}
            />
          </div>
          <div className="filter-menu__option status">
            <h4 className="options-header">Status</h4>
            <div className="checkboxes">
              <div className="col">
                {statusOptions.slice(0, 4).map((status, index) => {
                  return (
                    <div className="status-option" key={index}>
                      <input
                        type="checkbox"
                        name="status"
                        id={status}
                        value={status}
                        onChange={onStatusChange}
                      />
                      <label htmlFor={status}>{status}</label>
                    </div>
                  );
                })}
              </div>
              <div className="col">
                {statusOptions.slice(4, 7).map((status, index) => {
                  return (
                    <div className="status-option" key={index}>
                      <input
                        type="checkbox"
                        name="status"
                        id={status}
                        value={status}
                        onChange={onStatusChange}
                      />
                      <label htmlFor={status}>{status}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="filter-menu__option">
            <label htmlFor="listed">Listed</label>
            <Select
              options={listedOptions}
              defaultValue={listedOptions[listedDefaultIndex]}
              className="listed-select"
              id="listed"
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder="Listed"
              isSearchable={false}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              onChange={onListedChange}
            />
          </div>
          <div className="filter-menu__buttons">
            <button onClick={cancel} className="button secondary-button">
              Cancel
            </button>
            <button onClick={apply} className="button primary-button">
              Apply
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
