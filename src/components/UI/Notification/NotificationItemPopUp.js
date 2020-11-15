/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

const A = css`
    color: #ffc107;
    font-weight: bold;
`;

const mockContent = (
    <div
        css={css`
            padding: 0.5rem;
            font-size: 0.7rem;
        `}
    >
        <span css={A} to="#name">
            Marko
        </span>
        <div>
            Last seen watching{" "}
            <span css={A} to="#">
                Arrested Development
            </span>{" "}
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
