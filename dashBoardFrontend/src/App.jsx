import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import Header from './components/Header.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import BarChart from './components/Chat/BarChart.jsx';
import {UserData} from "./components/Data/Data.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from "./components/Chat/LineChart.jsx";
import Chart from 'chart.js/auto';
import PieChart from "./components/Chat/PieChart.jsx";
import {Radar} from "react-chartjs-2";
import RadarChart from "./components/Chat/RadarChart.jsx";
import BarTestChart from "./components/Chat/BarTest.jsx";

function App() {

    const [chartData, setChartData] = useState([]);
    const [selectedItem, setSelectedItem] = useState("sector");
    const [intensityData, setIntensityData] = useState({});
    const [likelihoodData, setLikelihoodData] = useState({});
    const [relevanceData, setRelevanceData] = useState({});

    const [end_year, setEnd_year] = useState({});
    const [country, setCountry] = useState({});
    const [topic, setTopic] = useState({});
    const [region, setRegion] = useState({});


/*
    console.log("intensity" ,intensityData);
    console.log("likelihood" ,likelihoodData);
    console.log("relevance" ,relevanceData);
*/

    console.log("yearsData" ,end_year);
    console.log("countryData" ,country);
    console.log("topicData" ,topic);
    console.log("regionData" ,region);




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

    const calculateAverage = (attrName) => {
        const sumMap = {};
        const countMap = {};

        chartData.forEach(item => {
            const city = item[selectedItem];
            const attrValue = parseInt(item[attrName]);
            if (city !== "" && city !== null && !isNaN(attrValue) && attrValue !== "" && attrValue !== null) {
                sumMap[city] = (sumMap[city] || 0) + attrValue;
                countMap[city] = (countMap[city] || 0) + 1;
            }
        });

        const averageMap = {};
        for (const city in sumMap) {
            if (countMap[city] > 0) {
                const sum = sumMap[city];
                const count = countMap[city];
                const average = sum / count;
                averageMap[city] = average;
            }
        }

        if (attrName === "intensity") {
            setIntensityData(averageMap);
        } else if (attrName === "likelihood") {
            setLikelihoodData(averageMap);
        } else if (attrName === "relevance") {
            setRelevanceData(averageMap);
        }
    };



    // Create an object to store the data grouped by year
// Create an object to store the data grouped by year
    const calculateFrequency = (attrName) => {
        const yearData = {};

// Process the JSON data and group it by year
        chartData.forEach(entry => {
            const year = entry[attrName];
            const sector = entry[selectedItem]

            if (year && sector) {
                if (!yearData[year]) {
                    yearData[year] = {};
                }
                // Check if the sector is not null and not undefined, then increment its count; otherwise, set it to 1.
                yearData[year][sector] = (yearData[year][sector] || 0) + 1;
            }
        });

        if (attrName === "end_year") {
            setEnd_year(yearData);
        } else if (attrName === "country") {
            setCountry(yearData);
        } else if (attrName === "topic") {
            setTopic(yearData);
        }else if (attrName === "region") {
            setRegion(yearData);
        }


/*
        console.log(yearData);
*/
    };



    useEffect(() => {
        // Calculate the averages for intensity, likelihood, and relevance separately
        calculateAverage("intensity");
        calculateAverage("likelihood");
        calculateAverage("relevance");

        calculateFrequency('end_year')
        calculateFrequency('country')
        calculateFrequency('topic')
        calculateFrequency('region')


    }, [chartData, selectedItem]);





    return (
        <>
            <Header selectedItem={selectedItem} handleSelect={handleDropDownSelect}/>
            <Container>
                <Row>
                    <Col>
                        <BarChart chartData={intensityData} />
                    </Col>
                    <Col>
                        <BarTestChart chartData={likelihoodData} />
                    </Col>
                    <Col>
                        <LineChart chartData={likelihoodData} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PieChart chartData={relevanceData} />
                    </Col>
                    <Col>
                        <RadarChart chartData={relevanceData} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
