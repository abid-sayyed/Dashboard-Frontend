import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropDown({ selectedItem, handleSelect }) {


    return (
        <DropdownButton
            id="dropdown-item-button"
            title={selectedItem}
            variant="secondary"
            onSelect={handleSelect}

        >
            <Dropdown.Item eventKey="end_year">end_year</Dropdown.Item>
            <Dropdown.Item eventKey="topic">topic</Dropdown.Item>
            <Dropdown.Item eventKey="sector">sector</Dropdown.Item>
            <Dropdown.Item eventKey="region">region</Dropdown.Item>
            <Dropdown.Item eventKey="pestle">pestle</Dropdown.Item>
            <Dropdown.Item eventKey="source">source</Dropdown.Item>
            <Dropdown.Item eventKey="country">country</Dropdown.Item>
            <Dropdown.Item eventKey="start_year">start_year</Dropdown.Item>

        </DropdownButton>
    );
}

export default DropDown;
