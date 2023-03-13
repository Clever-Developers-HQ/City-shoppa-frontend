import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  bezierCurve : false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Visitors',
    },
  },
};

const labels = ['3 Mar', '4 Mar', '5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar'];

export const data = {
  labels,
  datasets: [
    {
      // fill: true,
      lineTension: 0,  
      label: 'Visitors',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: "rgba(220,220,220,1)",
    },
  ],
};

export function Charts() {
  return <Line options={options} data={data} />;
}
