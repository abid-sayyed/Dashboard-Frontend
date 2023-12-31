import React from "react";
import {Pie, Radar} from "react-chartjs-2";
import Chart from 'chart.js/auto';

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Relevance - Radar Chart',
        },
    },
    responsive: true,

};


function RadarChart({ chartData }) {

    const labels = Object.entries(chartData).map(([key, value]) => key);
    const intensityValues = Object.entries(chartData).map(([key, value]) => value);


    const userData = {
        labels,
        datasets: [
            {
                label: 'Relevance',
                data: intensityValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,

            },
        ],
    };

    return <Radar data={userData} options={options} />;
}

export default RadarChart;
