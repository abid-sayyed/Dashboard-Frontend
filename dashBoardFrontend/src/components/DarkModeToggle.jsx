import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'light' : 'dark');
    };

    const buttonStyle = {
        borderRadius: '15%', // Make the button round
        border: isDarkMode ? '1px solid white' : '1px solid black',
    };


    return (
        <Button variant={isDarkMode ? 'light' : 'dark'} onClick={toggleDarkMode} style={buttonStyle}>
            {isDarkMode ? 'Light' : 'Dark'}
        </Button>
    );
}

export default DarkModeToggle;
