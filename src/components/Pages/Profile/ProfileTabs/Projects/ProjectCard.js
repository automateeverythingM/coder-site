import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Toast } from "react-bootstrap";
export default function ProjectCard() {
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
                <h4>short description</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint voluptatum non expedita illum assumenda. Cupiditate
                    voluptate at reprehenderit vitae ipsum ratione nulla,
                    tenetur non ullam! Accusamus facilis sequi labore
                    voluptates.
                </p>
                git repo:{" "}
                <a href="https://github.com/automateEverything">
                    https://github.com/automateEverything
                </a>
            </Toast.Body>
        </Toast>
    );
}
