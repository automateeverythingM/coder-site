import React, { useState } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../../../store/reducers/projectReducer";
import { truncate } from "loadsh";
import { Link } from "react-router-dom";
const paragraph = css`
    font-size: 0.8rem;
`;

export default function ProjectCard({
    description,
    title,
    lookingFor,
    repoSrc,
    id,
}) {
    const dispatch = useDispatch();
    const [animate, setAnimate] = useState(
        "animate__animated animate__zoomIn animate__faster"
    );

    const descriptionTruncated = truncate(description, {
        length: 150,
        separator: " ",
        omission: "...",
    });

    return (
        <Toast
            css={css`
                width: 48%;
            `}
            className={`d-inline-block mr-2 ${animate}`}
            onClose={() => {
                dispatch(deleteProject(id));
            }}
            onAnimationEnd={() => {
                setAnimate("");
            }}
        >
            <Toast.Header>
                <div
                    css={css`
                        width: 1rem;
                        height: 1rem;
                    `}
                    className="bg-dark rounded mr-2"
                />
                <Link className="mr-auto" to={`/project/${id}`}>
                    <span className="font-weight-bold">{title}</span>
                </Link>
            </Toast.Header>
            <Toast.Body
                css={css`
                    word-break: break-word;
                `}
            >
                <h6>About</h6>
                <p css={paragraph}>{descriptionTruncated}</p>
                <h6>Im looking for </h6>
                <p css={paragraph}>{lookingFor}</p>
                git repo: <a href={repoSrc}>{repoSrc}</a>
            </Toast.Body>
        </Toast>
    );
}
