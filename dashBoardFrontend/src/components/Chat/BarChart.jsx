import React from "react";
import { Bar } from "react-chartjs-2";
import chart from 'chart.js/auto';
import { Chart,  ArcElement, Tooltip, Legend } from "chart.js";

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Intensity - Bar Chart',
        },
    },
    responsive: true,

};

function BarChart({ chartData }) {
    // Use Object.entries().map to iterate through the object and get the labels
    const labels = Object.entries(chartData).map(([key, value]) => key);
    const intensityValues = Object.entries(chartData).map(([key, value]) => value);


    const userData = {
        labels, // Use the labels obtained from the object
        datasets: [
            {
                label: "Intensity",
                data: intensityValues, // Extract intensity from the object
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            },
        ],


    };



    return <Bar data={userData} options={options} />;
}

export default BarChart;
