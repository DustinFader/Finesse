import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Bar = ({income, expense, categories}) => {
  const barRef = useRef(null);

  const data = {
    labels: ['Money'],
    datasets: [
      {
        barThickness: 80,
        label: "Income",
        data: [
          {x: [0, income], y: 'Money'}
        ],
        backgroundColor: [
          '#55C572',
        ],
        borderWidth: 1,
      },
      {
        barThickness: 80,
        label: "Expenses",
        data: [expense],
        backgroundColor: [
          '#C70039',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const ctx = barRef.current.getContext('2d');
    let barInstance = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        plugins: {
          legend: {
             display: false,
          }
       },
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          }
        }
      }
    });
  
    return () => {
      barInstance.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas ref={barRef} />
    </div>
  );
};

export default Bar;
