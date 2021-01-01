import React from "react";
import { Jumbotron } from "react-bootstrap";
import Search from "../SearchAutoCompleteStyledComp/SearchAutoTags";
import classes from "./herostyle.module.css";
import img from "../../../../img/reworkWatermelon.svg";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
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
                className="container bg-dark"
                css={css`
                    min-height: 30em;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-image: url(${img});
                    background-repeat: no-repeat;
                `}
            >
                <div className="container text-center text-white">
                    <h1 className="display-3">Find your code buddy</h1>
                    <Search />
                </div>
            </Jumbotron>
        </div>
    );
}
