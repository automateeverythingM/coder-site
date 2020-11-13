import React from "react";
import { Jumbotron } from "react-bootstrap";
import { Button, Input, Select } from "semantic-ui-react";
import Search from "../SearchAutoCompleteStyledComp/SearchAppHolder";
import SearchSelect from "../SearchComponent/SearchSelect";
import classes from "./herostyle.module.css";
export const options = [
    { key: "all", text: "All", value: "all" },
    { key: "articles", text: "Articles", value: "articles" },
    { key: "products", text: "Products", value: "products" },
];
export default function HeroSearch() {
    return (
        <div className="bg-dark">
            <Jumbotron
                fluid
                className={`container bg-dark ${classes.herolvl1} ${classes.watermelon}`}
            >
                <div className="container text-center text-white">
                    <h1 className="display-3">Find your code buddy</h1>
                    {/* <Input type="text" placeholder="Search..." action>
          <input />
          <Select compact options={options} defaultValue="articles" />
          <Button type="submit">Search</Button>
        </Input> */}

                    <Search />
                </div>
            </Jumbotron>
        </div>
    );
}
