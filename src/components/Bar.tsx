import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Bar = ({ data }) => {
  const barRef = useRef(null);

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
