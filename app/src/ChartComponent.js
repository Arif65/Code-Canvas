import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ arrayElements, currentIndex, foundIndex }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      // Update chart data based on props
      updateChart();
    } else {
      // Create new chart instance
      createChart();
    }
  }, [arrayElements, currentIndex, foundIndex]);

  const createChart = () => {
    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: arrayElements.map((_, index) => `${index + 1}`),
        datasets: [{
          label: 'Array Elements',
          data: arrayElements,
          backgroundColor: arrayElements.map((_, index) => {
            if (index === currentIndex) {
              return 'rgba(255, 206, 86, 0.5)'; // Highlight current index
            }
            if (index === foundIndex) {
              return 'rgba(75, 192, 192, 0.5)'; // Highlight found value
            }
            return 'rgba(54, 162, 235, 0.5)'; // Default color
          }),
          borderColor: arrayElements.map((_, index) => {
            if (index === currentIndex) {
              return 'rgba(255, 206, 86, 1)'; // Highlight current index
            }
            if (index === foundIndex) {
              return 'rgba(75, 192, 192, 1)'; // Highlight found value
            }
            return 'rgba(54, 162, 235, 1)'; // Default color
          }),
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
              label: (tooltipItem) => tooltipItem.raw.toFixed(1),
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
              text: 'Element Index',
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
    chartInstance.current.data.labels = arrayElements.map((_, index) => `${index + 1}`);
    chartInstance.current.data.datasets[0].data = arrayElements;
    chartInstance.current.data.datasets[0].backgroundColor = arrayElements.map((_, index) => {
      if (index === currentIndex) {
        return 'rgba(255, 206, 86, 0.5)'; // Highlight current index
      }
      if (index === foundIndex) {
        return 'rgba(75, 192, 192, 0.5)'; // Highlight found value
      }
      return 'rgba(54, 162, 235, 0.5)'; // Default color
    });
    chartInstance.current.data.datasets[0].borderColor = arrayElements.map((_, index) => {
      if (index === currentIndex) {
        return 'rgba(255, 206, 86, 1)'; // Highlight current index
      }
      if (index === foundIndex) {
        return 'rgba(75, 192, 192, 1)'; // Highlight found value
      }
      return 'rgba(54, 162, 235, 1)'; // Default color
    });
    chartInstance.current.update();
  };

  return <canvas ref={chartContainer} width="1500px" height="500"></canvas>;
};

export default ChartComponent;
