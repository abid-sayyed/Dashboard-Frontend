import React from "react";
import {Bar, Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Topics - Line Chart',
        },
    },
    responsive: true,

};

function LineChartTest({ chartData }) {

    const labels = Object.entries(chartData).map(([key, value]) => key);
    const intensityValues = Object.entries(chartData).map(([key, value]) => value);


    const userData = {
        labels,
        datasets: [
            {
                label: "Intensity",
                data: intensityValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
        ],
    };

    return <Line data={userData} />;
}

export default LineChartTest;
