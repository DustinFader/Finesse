import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ catTotals }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [...catTotals.map(cat => cat.name)],
        datasets: [
          {  
            data: [...catTotals.map(cat => cat.categoryTotal)],
            backgroundColor: [
              // randomized rgba based on the amount of categories
              ...catTotals.map(cat => {
              return cat.color;
            })
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
           legend: {
              display: false
           }
        }
      }
    });
  
    return () => {
      chartInstance.destroy();
    };
  }, [catTotals]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
