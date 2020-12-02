import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Toast } from "react-bootstrap";

const paragraph = css`
    font-size: 0.8rem;
`;

export default function ProjectCard({
    description,
    title,
    lookingFor,
    repoSrc,
}) {
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
                <span className="mr-auto">{title}</span>
            </Toast.Header>
            <Toast.Body>
                <h6>short description</h6>
                <p css={paragraph}>{description}</p>
                <h6>Im looking for </h6>
                <p css={paragraph}>{lookingFor}</p>
                git repo: <a href={repoSrc}>{repoSrc}</a>
            </Toast.Body>
        </Toast>
    );
}
