import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Bar = ({totalAmount, categories}) => {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = barRef.current.getContext('2d');
    let barInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Money'],
        datasets: [
          {
            barThickness: 80,
            label: "Income",
            data: [
              {x: [0, totalAmount(true)], y: 'Money'}
            ],
            backgroundColor: ['#68F081'],
            borderWidth: 1,
            borderColor: 'black',
          },
          {
            barThickness: 80,
            label: "Expenses",
            data: [{
              x: [-totalAmount(false), 0], y: 'Money'
            }],
            backgroundColor: ['#E33651'],
            borderWidth: 1,
            borderColor: 'black'
          },
        ],
      },
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
  }, [totalAmount]);

  return (
    <div>
      <canvas ref={barRef} />
    </div>
  );
};

export default Bar;
