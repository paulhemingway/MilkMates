import React, { useState } from "react";
import Select from "react-select";
import DoughnutChart from "components/charts/DoughnutChart";
import LineChart from "components/charts/LineChart";

export default function LogCharts({ batches }) {
  const [selection, setSelection] = useState("week");
  const [chartOption, setChartOption] = useState(0);

  const statusCount = batches.reduce((freq, batch) => {
    // get event name from latest event
    const status = batch.events.reduce((prev, curr) =>
      new Date(curr.eventDate) > new Date(prev.eventDate) ? curr : prev
    ).event;
    freq[status] = (freq[status] || 0) + 1;
    return freq;
  }, {});

  const timespanSelectOptions = [
    {
      value: "week",
      label: (
        <div className="option">
          <span aria-label="Past Week">Past Week</span>
        </div>
      ),
    },
    {
      value: "month",
      label: (
        <div className="option">
          <span aria-label="Past Month">Past Month</span>
        </div>
      ),
    },
    {
      value: "3months",
      label: (
        <div className="option">
          <span aria-label="Past 3 Months">Past 3 Months</span>
        </div>
      ),
    },
    {
      value: "6months",
      label: (
        <div className="option">
          <span aria-label="Past 6 Months">Past 6 Months</span>
        </div>
      ),
    },
    {
      value: "year",
      label: (
        <div className="option">
          <span aria-label="Past Year">Past Year</span>
        </div>
      ),
    },
  ];

  const onTimespanChange = (selected) => {
    setSelection(selected.value);
  };

  return (
    <div className="log-charts">
      {batches.length === 0 && <p>There are no batches to display.</p>}
      {batches.length > 0 && (
        <>
          <div className="buttons">
            <button
              onClick={() => setChartOption(0)}
              className={`left button ${
                chartOption === 0 ? "primary" : "secondary"
              }-button-blue`}
            >
              Milk Production
            </button>
            <button
              onClick={() => setChartOption(1)}
              className={`right button ${
                chartOption === 1 ? "primary" : "secondary"
              }-button-blue`}
            >
              Batch Status
            </button>
          </div>
          {chartOption === 0 && (
            <>
              <Select
                options={timespanSelectOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                defaultValue={timespanSelectOptions[0]}
                inputId="timespan-select"
                className="timespan-select"
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
                onChange={onTimespanChange}
              />

              <LineChart data={batches} selection={selection} />
            </>
          )}
          {chartOption === 1 && <DoughnutChart data={statusCount} />}
        </>
      )}
    </div>
  );
}
