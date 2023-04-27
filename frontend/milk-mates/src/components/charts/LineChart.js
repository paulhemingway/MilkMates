import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({data}) {
console.log(data);
    
    const monthValues = data.reduce((sum, {productionDate, volume}) => {
        const date = new Date(productionDate)
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`
        sum[month] = (sum[month] || 0) + volume
        return sum
    }, {})

    console.log(monthValues)

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      
      const numbers = [
        10, // January
        15, // February
        20, // March
        50, // April
        30, // May
        35, // June
        20, // July
        45, // August
        50, // September
        55, // October
        40, // November
        38, // December
      ];
      
      const colors = [
        "rgba(255, 99, 132, 0.9)", // Logged
        
      ];
      
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Logged Batches",
            backgroundColor: colors[0],
            borderColor: colors[0],
            data: numbers,
          },
        ],
      };
      
      const options = {
        plugins: {
          title: {
            display: true,
            text: "Total Ounces Produced",
            padding: 20,
            fontColor: "rgb(255,0,0)",
            font: {
              size: 18,
            },
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 11,
              font: {
                size: 11,
              },
            },
          },
        },
      };
      
      return <Line data={chartData} options={options} />;
      

    }

        
    

