import React from "react";
import {Pie} from "react-chartjs-2";
import Chart from 'chart.js/auto';
export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Likelihood - Pie Chart',
        },
    },

};

function PieChart({ chartData }) {

    const labels = Object.entries(chartData).map(([key, value]) => key);
    const intensityValues = Object.entries(chartData).map(([key, value]) => value);


    const userData = {
        labels,
        datasets: [
            {
                label: 'Likelihood',
                data: intensityValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,

            },
        ],
    };

    return <Pie data={userData} options={options} />;
}

export default PieChart;
