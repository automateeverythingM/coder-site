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
    imgSize = "50px",
}) {
    return (
        <div
            css={css`
                display: flex;
                width: 100%;
                height: 100%;
                align-items: center;
                padding: 1rem;
                background: whitesmoke;
                cursor: pointer;
                border: 1px solid #00000033;
                margin-bottom: 0.25rem;
                &:hover {
                    background: #000000ee;
                    color: whitesmoke;
                }
            `}
        >
            <img
                css={css`
                    max-width: ${imgSize};
                    max-height: ${imgSize};
                    width: ${imgSize};
                    height: ${imgSize};
                `}
                src={imgSrc}
                alt={alt}
            />
            {contentMsg}
        </div>
    );
}
