import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import Header from './components/Header.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import BarChart from './components/BarChart.jsx';
import {UserData} from "./components/Data/Data.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from "./components/LineChart.jsx";
import Chart from 'chart.js/auto';
import PieChart from "./components/Data/PieChart.jsx";
import {Radar} from "react-chartjs-2";
import RadarChart from "./components/RadarChart.jsx";

function App() {
    const [chartData, setChartData] = useState([]);
    const [selectedItem, setSelectedItem] = useState("sector");
    const [averageData, setAverageData] = useState({});

    console.log(selectedItem)

    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
    };

    const handleDropDownSelect = (eventKey) => {
        handleSelect(eventKey);
    };



    useEffect(() => {
        const fetchDataFromBackend = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api");
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDataFromBackend();
    }, []);


// Calculate the sum and count for each unique key
    // ... (other state variables and functions)

    useEffect(() => {
        // Define the function to calculate the average
        const calculateAverage = () => {

            const sumMap = {};
            const countMap = {};

            chartData.forEach(item => {
                const city = item[selectedItem];
                const intensity = parseInt(item.intensity);
                if (city !== "" && city !== null && !isNaN(intensity) && intensity !== "" && intensity !== null) {
                    sumMap[city] = (sumMap[city] || 0) + intensity;
                    countMap[city] = (countMap[city] || 0) + 1;
                    console.log("from selected item working")
                }
            });

            const averageMap = {};
            for (const city in sumMap) {
                if (countMap[city] > 0) { // Check if there's at least one valid value
                    const sum = sumMap[city];
                    const count = countMap[city];
                    const average = sum / count;
                    averageMap[city] = average;
                }
            }

            // Store the average data in the state
            setAverageData(averageMap);

            // You can do something with the average data, like rendering it in your component
            console.log("abid Average Intensity:", averageMap);
        };

        // Call the calculateAverage function when chartData changes
        calculateAverage();
    }, [chartData,selectedItem]);

    console.log(typeof averageData)


    return (
        <>
            <Header selectedItem={selectedItem} handleSelect={handleDropDownSelect}/>
            <Container>
                <Row>
                    <Col>
                        <BarChart chartData={averageData} />
                    </Col>
                    <Col>
                        <LineChart chartData={averageData} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PieChart chartData={averageData} />
                    </Col>
                    <Col>
                        <RadarChart chartData={averageData} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
