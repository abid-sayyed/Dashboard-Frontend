import React from "react";
import {Line, Bubble} from "react-chartjs-2";
import Chart from 'chart.js/auto';


const options = {
    plugins: {
        title: {
            display: true,
            text: 'End_Years - Stack Bar Chart' ,
        },
    },
    responsive: true,
    scales: {
        x: {
            type: 'category',
            title: {
                display: true,
                text: 'Categories',
            },
        },
    },
};



function BubbleChart({ chartData , setSelectedLocationType}) {

    options.plugins.title.text = setSelectedLocationType;

    // Use Object.entries().map to iterate through the object and get the labels
    const labels = Object.keys(chartData);
    const dataArrays = Object.values(chartData);

    const uniqueKeysSet = new Set();
// Iterate through the data and collect unique keys
    dataArrays.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
            uniqueKeysSet.add(key);
        });
    });

// Convert the Set to an array and sort it alphabetically
    const uniqueKeys = [...uniqueKeysSet].sort();


    const userData = {
        datasets: uniqueKeys.map((key, index) => ({
            label: key,
            data : dataArrays.map((entry) => ({
                x: labels[index],
                y: entry[key] !== undefined ? entry[key] : 'null',
                r: entry[key] !== undefined ? entry[key] : 'null',
                type: 'category',

            })),

        })),
    };


    return <Bubble data={userData} options={options} />;
}

export default BubbleChart;
