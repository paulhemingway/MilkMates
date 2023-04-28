import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function DoughnutChart({ data }) {
  const total = Object.values(data).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const labels = [
    "Logged",
    "Refrigerated",
    "Frozen",
    "Thawed",
    "Consumed",
    "Shared",
    "Discarded",
  ];

  const numbers = [
    data.logged ?? 0,
    data.refrigerated ?? 0,
    data.frozen ?? 0,
    data.thawed ?? 0,
    data.consumed ?? 0,
    data.shared ?? 0,
    data.discarded ?? 0,
  ];

  const colors = [
    "rgba(255, 99, 132, 0.9)", // Logged
    "rgba(54, 162, 235, 0.9)", // Refrigerated
    "rgba(255, 206, 86, 0.9)", // Frozen
    "rgba(75, 192, 192, 0.9)", // Thawed
    "rgba(153, 102, 255, 0.9)", // Consumed
    "rgba(255, 159, 64, 0.9)", // Shared
    "rgba(220, 53, 69, 0.9)", // Discarded
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Batches",
        backgroundColor: colors,
        borderColor: "white",
        data: numbers,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Batch Statuses",
        padding: 20,
        fontColor: "rgb(255,0,0)",
        font: {
          size: 18,
        },
      },
      legend: {
        display: true,
        position: "left",
        labels: {
          boxWidth: 10,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <>
      <Doughnut data={chartData} options={options} />
      <p className="total">
        Total Batches: <span className="total-amount">{total}</span>
      </p>
    </>
  );
}
