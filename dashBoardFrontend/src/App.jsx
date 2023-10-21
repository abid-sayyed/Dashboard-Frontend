import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import Header from './components/Header.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import BarChart from './components/Chat/BarChart.jsx';
import {UserData} from "./components/Data/Data.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import PieChart from "./components/Chat/PieChart.jsx";
import RadarChart from "./components/Chat/RadarChart.jsx";
import StackBar from "./components/Chat/StackBar.jsx";
import Button from "react-bootstrap/Button";
import BubbleChart from "./components/Chat/Bubblechart.jsx";
import {Bubble} from "react-chartjs-2";
import LineChart from "./components/Chat/LineChart.jsx";

function App() {

    const [chartData, setChartData] = useState([]);
    const [selectedItem, setSelectedItem] = useState("sector");
    const [intensityData, setIntensityData] = useState({});
    const [likelihoodData, setLikelihoodData] = useState({});
    const [relevanceData, setRelevanceData] = useState({});

    const [selectedDataType, setSelectedDataType] = useState("end_year"); // Set an initial default value
    const [startYear, setStartYear] = useState({});
    const [end_year, setEnd_year] = useState({});

    const [selectedLocationType, setSelectedLocationType] = useState("country"); // Set an initial default value
    const [countryData, setCountry] = useState({});
    const [region, setRegion] = useState({});


    const [topicData, setTopic] = useState({});




    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
    };

    const handleDropDownSelect = (eventKey) => {
        handleSelect(eventKey);
    };

    useEffect(() => {
        const fetchDataFromBackend = async (url) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

/*
        fetchDataFromBackend("http://127.0.0.1:8000/api"); // URL 1
*/
        fetchDataFromBackend("https://abidwork.pythonanywhere.com/api");  // URL 2
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

        // Sort the keys in each object of yearData in alphabetical order
        for (const year in yearData) {
            yearData[year] = Object.fromEntries(
                Object.entries(yearData[year]).sort((a, b) => a[0].localeCompare(b[0]))
            );
        }

        if (attrName === "end_year") {
            setEnd_year(yearData);
        } else if (attrName === "start_year") {
            setStartYear(yearData);
        }else if (attrName === "country") {
            setCountry(yearData);
        } else if (attrName === "topic") {
            setTopic(yearData);
        }else if (attrName === "region") {
            setRegion(yearData);
        }

    };



    useEffect(() => {
        // Calculate the averages for intensity, likelihood, and relevance separately
        calculateAverage("intensity");
        calculateAverage("likelihood");
        calculateAverage("relevance");

        calculateFrequency('end_year')
        calculateFrequency('start_year')
        calculateFrequency('country')
        calculateFrequency('topic')
        calculateFrequency('region')



    }, [chartData, selectedItem]);



    return (
        <>
            <Header selectedItem={selectedItem} handleSelect={handleDropDownSelect}/>
            <Container >
                <Row>
                    <Col className ="border border-success p-2 mb-2"  style={{ marginRight: '5px' }}>
                        <BarChart chartData={intensityData}  />
                    </Col>
                    <Col className ="border border-success p-2 mb-2" style={{ marginRight: '5px' }} >
                        <PieChart chartData={likelihoodData} />
                    </Col>
                </Row>
                <Row>
                    <Col className ="border border-success p-2 mb-2"  style={{ marginRight: '5px' }}>
                        <Button variant= "outline-secondary" style={{ marginRight: '10px' }} onClick={() => setSelectedDataType("start_year")}>Start Year</Button>
                        <Button variant= "outline-secondary"  onClick={() => setSelectedDataType("end_year")}>End Year</Button>
                        <StackBar chartData={selectedDataType === "start_year" ? startYear : end_year} selectedDataType={selectedDataType} />

                    </Col>
                </Row>
                <Row>
                    <Col className ="border border-success p-2 mb-2"  style={{ marginRight: '5px' }}>
                        <Button variant= "outline-secondary" style={{ marginRight: '10px' }} onClick={() => setSelectedLocationType("country")}>country</Button>
                        <Button variant= "outline-secondary"   onClick={() => setSelectedLocationType("region")}>region</Button>
                        <BubbleChart chartData={selectedLocationType === "country" ? countryData : region} setSelectedLocationType={selectedLocationType} />
                    </Col>
                </Row>
                <Row>
                    <Col className ="border border-success p-2 mb-2"  style={{ marginRight: '5px' }}>
                        <LineChart chartData={topicData} />
                    </Col>
                </Row>
                <Row>
                    <Col className ="border border-success p-2 mb-2"  style={{ marginRight: '5px' }}>
                        <RadarChart chartData={relevanceData} />
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default App;
