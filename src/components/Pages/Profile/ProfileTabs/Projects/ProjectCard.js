import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Toast } from "react-bootstrap";

const paragraph = css`
    font-size: 0.8rem;
`;

export default function ProjectCard({ description, title }) {
    return (
        <Toast
            css={css`
                width: 48%;
            `}
            className="d-inline-block mr-2"
        >
            <Toast.Header>
                <div
                    css={css`
                        width: 1rem;
                        height: 1rem;
                    `}
                    className="bg-dark rounded mr-auto"
                />
                <span className="mr-auto">adoptmeproject</span>
            </Toast.Header>
            <Toast.Body>
                <h6>short description</h6>
                <p css={paragraph}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint voluptatum non expedita illum assumenda. Cupiditate
                    voluptate at reprehenderit vitae ipsum ratione nulla,
                    tenetur non ullam! Accusamus facilis sequi labore
                    voluptates.
                </p>
                <h6>You cant help me if you know...</h6>
                <p css={paragraph}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis placeat eum ea ipsa dolorum.
                </p>
                git repo:{" "}
                <a href="https://github.com/automateEverything">
                    https://github.com/automateEverything
                </a>
            </Toast.Body>
        </Toast>
    );
}
