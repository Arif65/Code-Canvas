import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponentSort = ({ arrayElements, chartColors }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const prevArrayElements = useRef([]);
  const prevChartColors = useRef([]);

  useEffect(() => {
    if (chartInstance.current) {
      updateChart();
    } else {
      createChart();
    }

    // Update the refs with the current state after rendering
    prevArrayElements.current = [...arrayElements];
    prevChartColors.current = [...chartColors];
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
                return Math.round(tooltipItem.raw).toString();
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
      const chart = chartInstance.current;
      const changedIndices = [];

      // Find the indices of changed elements in arrayElements
      arrayElements.forEach((value, index) => {
        if (value !== prevArrayElements.current[index]) {
          changedIndices.push(index);
        }
      });

      // Find the indices of changed elements in chartColors
      chartColors.forEach((colorObj, index) => {
        if (
          !prevChartColors.current[index] ||
          colorObj.color !== prevChartColors.current[index].color
        ) {
          if (!changedIndices.includes(index)) {
            changedIndices.push(index);
          }
        }
      });

      // Update only the changed elements
      changedIndices.forEach(index => {
        if (chartColors[index]) {
          chart.data.datasets[0].data[index] = arrayElements[index];
          chart.data.datasets[0].backgroundColor[index] = chartColors[index].color;
          chart.data.datasets[0].borderColor[index] = chartColors[index].color.replace('0.5', '1');
        }
      });

      chart.update();

      // Update the previous state references
      prevArrayElements.current = [...arrayElements];
      prevChartColors.current = [...chartColors];
    }
  };

  return <canvas ref={chartContainer} width="1500px" height="500"></canvas>;
};

export default ChartComponentSort;
