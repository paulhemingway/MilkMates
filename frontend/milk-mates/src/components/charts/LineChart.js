import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function LineChart({ data, selection }) {
  const [labels, setLabels] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [total, setTotal] = useState(0);
  const [title, setTitle] = useState("")

  useEffect(() => {
    updateEverything(selection);
  }, [selection]);

  useEffect(() => {
    setTotal(
      numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }, [numbers]);

  const updateEverything = async (selection) => {
    await filterBatches(selection);
  };

  const filterBatches = async (selection) => {
    let batches = data;
    let compareDate = new Date();
    switch (selection) {
      case "week":
        // set to a week ago
        compareDate.setDate(compareDate.getDate() - 7);
        setTitle("Past Week")
        break;
      case "month":
        compareDate.setMonth(compareDate.getMonth() - 1);
        setTitle("Past Month")
        break;
      case "3months":
        compareDate.setMonth(compareDate.getMonth() - 3);
        setTitle("Past 3 Months")
        break;
      case "6months":
        compareDate.setMonth(compareDate.getMonth() - 6);
        setTitle("Past 6 Months")
        break;
      case "year":
        compareDate.setYear(compareDate.getFullYear() - 1);
        setTitle("Past Year")
        break;
      default:
        return;
    }
    batches = batches.filter((batch) => {
      return new Date(batch.productionDate) >= compareDate;
    });
    getChartData(selection, batches);
  };

  const getChartData = (selection, batches) => {
    let newLabels = [];
    let newNumbers = [];
    let compareDate = new Date();
    switch (selection) {
      case "week":
        for (let i = 0; i < 7; i++) {
          newLabels.unshift(moment(compareDate).format("ddd"));
          newNumbers.unshift(
            getNumber(
              compareDate.setHours(0, 0, 0, 0),
              compareDate.setHours(23, 59, 59, 999),
              batches
            )
          );
          compareDate.setDate(compareDate.getDate() - 1);
        }
        break;
      case "month":
        let lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        while (compareDate >= lastMonth) {
          newLabels.unshift(moment(compareDate).format("MMM D"));
          newNumbers.unshift(
            getNumber(
              compareDate.setHours(0, 0, 0, 0),
              compareDate.setHours(23, 59, 59, 999),
              batches
            )
          );
          compareDate.setDate(compareDate.getDate() - 1);
        }
        break;
      case "3months":
        let last3Month = new Date();
        last3Month.setMonth(last3Month.getMonth() - 3);
        while (compareDate >= last3Month) {
          let start = new Date(compareDate.setHours(0, 0, 0, 0));
          let end = new Date(compareDate.setHours(23, 59, 59, 999));
          end.setDate(end.getDate() + 6);

          newLabels.unshift(
            `${moment(start).format("M/D")} - ${moment(end).format("M/D")}`
          );
          newNumbers.unshift(getNumber(start, end, batches));
          compareDate.setDate(compareDate.getDate() - 7);
        }
        break;
      case "6months":
        let last6Month = new Date();
        last6Month.setMonth(last6Month.getMonth() - 6);
        while (compareDate >= last6Month) {
          let start = new Date(compareDate.setHours(0, 0, 0, 0));
          let end = new Date(compareDate.setHours(23, 59, 59, 999));
          end.setDate(end.getDate() + 13);

          newLabels.unshift(
            `${moment(start).format("M/D")} - ${moment(end).format("M/D")}`
          );
          newNumbers.unshift(getNumber(start, end, batches));
          compareDate.setDate(compareDate.getDate() - 14);
        }
        break;
      case "year":
        let lastYear = new Date();
        lastYear.setYear(lastYear.getFullYear() - 1);
        while (compareDate >= lastYear) {
          let start = new Date(compareDate.setHours(0, 0, 0, 0));
          start.setDate(1);
          let end = new Date(compareDate.setHours(23, 59, 59, 999));
          end.setMonth(end.getMonth() + 1);
          end.setDate(0);

          newLabels.unshift(moment(compareDate).format("MMMM YYYY"));
          newNumbers.unshift(getNumber(start, end, batches));
          compareDate.setMonth(compareDate.getMonth() - 1);
        }
        break;
    }

    setLabels(newLabels);
    setNumbers(newNumbers);
  };

  const getNumber = (start, end, batches) => {
    start = new Date(start);
    end = new Date(end);

    const totalVolume = batches.reduce((sum, curr) => {
      const date = new Date(curr.productionDate);
      if (date >= start && date < end) {
        return sum + curr.volume;
      } else {
        return sum;
      }
    }, 0);
    return totalVolume;
  };

  const colors = [
    "rgba(255, 99, 132, 0.9)", // Logged
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Ounces Produced",
        backgroundColor: colors[0],
        borderColor: colors[0],
        data: numbers,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Breastmilk Production - ${title}`,
        padding: 20,
        fontColor: "rgb(255,0,0)",
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return value + " oz";
          },
        },
      },
    },
  };

  return (
    <>
      <Line data={chartData} options={options} />
      <p className="total">
        Total Ounces: <span className="total-amount">{total}</span>
      </p>
    </>
  );
}
