import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
export const options = {
    plugins: {
        title: {
            display: true,
            text: 'End_Years - Stack Bar Chart' ,
        },
    },
    responsive: true,

};
function StackBar({ chartData , selectedDataType}) {

    options.plugins.title.text = selectedDataType;
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
        labels, // Use the labels obtained from the object
        datasets: uniqueKeys.map((key, index) => ({
            label: key,
            data: dataArrays.map((entry) => {
                return entry[key] !== undefined ? entry[key] : "null"; // null so it won't take space in between.
            }),
            skipNull: true,
            stack: 'stack', // This is the key to creating a stacked bar chart

        })),
    };



    return <Bar data={userData} options={options} />;
}

export default StackBar;
