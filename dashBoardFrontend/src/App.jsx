import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';


import Header from "./components/Header.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";


function App() {
    return (
        <>
            <DarkModeToggle/>
            <Header/>
        </>

    );
}

export default App;