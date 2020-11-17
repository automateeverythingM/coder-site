/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";

export default function Profile() {
    return (
        <div
            css={css`
                display: flex;
                height: 100%;
                background: linear-gradient(
                    to right,
                    #202122 50%,
                    whitesmoke 50%
                );
            `}
        >
            <div className="container">
                <div className="row">
                    <div className="col-3 bg-dark text-white">image</div>
                    <div className="col-9 bg-white text-dark">blah</div>
                </div>
            </div>
        </div>
    );
}
