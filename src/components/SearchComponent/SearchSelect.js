import React from "react";
import { Button, Dropdown, FormControl, InputGroup } from "react-bootstrap";
export default function SearchSelect() {
  return (
    <InputGroup size="lg" className="w-75 mx-auto h-100">
      <FormControl className="shadow-none border-0" placeholder="Search..." />
      <span className="clear-input">&times;</span>
      <InputGroup.Prepend>
        <Dropdown variant="secondary">
          <Dropdown.Toggle
            variant="outlined"
            className="shadow-none bg-white border-left h-100 rounded-0"
            id="dropdown-basic"
          >
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup.Prepend>
      <InputGroup.Prepend>
        <Button variant="secondary" className="rounded-right">
          Search
        </Button>
      </InputGroup.Prepend>
    </InputGroup>
  );
}
