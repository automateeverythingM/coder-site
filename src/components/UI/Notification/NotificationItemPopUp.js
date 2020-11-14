/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const A = css`
    color: ${(props) => props.color};
    font-weight: bold;
`;

const mockContent = (
    <div
        css={css`
            padding: 0.5rem;
            font-size: 0.7rem;
        `}
    >
        <Link css={A} to="#name">
            Marko
        </Link>
        <div>
            Last seen watching{" "}
            <Link css={A} to="#">
                Arrested Development
            </Link>{" "}
            just now.
        </div>
    </div>
);

export default function NotificationItemPopUp({
    imgSrc,
    linkColor = "yellow",
    alt = "",
    contentMsg = mockContent,
}) {
    return (
        <div
            css={css`
                display: flex;
                width: 100%;
                height: 100%;
                align-items: center;
                padding: 1rem;
                border-radius: 0.5rem;
                background: whitesmoke;
            `}
        >
            <img
                css={css`
                    max-width: 50px;
                    max-height: 50px;
                `}
                src={imgSrc}
                alt={alt}
            />
            {contentMsg}
        </div>
    );
}
