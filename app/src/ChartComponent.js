import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ arrayElements, chartColors }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      updateChart();
    } else {
      createChart();
    }
  }, [arrayElements, chartColors]);

  const createChart = () => {
    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: arrayElements.map((_, index) => `${index + 1}`),
        datasets: [{
          label: 'Array Elements',
          data: arrayElements,
          backgroundColor: chartColors.map(colorObj => colorObj.color),
          borderColor: chartColors.map(colorObj => colorObj.color.replace('0.5', '1')),
          borderWidth: 1,
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                // Convert tooltip label to integer
                return Math.round(tooltipItem.raw).toString(); // Adjust rounding method as needed
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value',
            },
            ticks: {
              stepSize: 10,
              max: 50,
            }
          },
          x: {
            title: {
              display: true,
              text: 'Index',
            },
          }
        },
        elements: {
          bar: {
            maxBarThickness: 40,
          }
        }
      }
    });
  };

  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.data.labels = arrayElements.map((_, index) => `${index + 1}`);
      chartInstance.current.data.datasets[0].data = arrayElements;
      chartInstance.current.data.datasets[0].backgroundColor = chartColors.map(colorObj => colorObj.color);
      chartInstance.current.data.datasets[0].borderColor = chartColors.map(colorObj => colorObj.color.replace('0.5', '1'));
      chartInstance.current.update();
    }
  };

  return <canvas ref={chartContainer} width="1500px" height="500"></canvas>;
};

export default ChartComponent;
