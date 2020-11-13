import React from "react";
import { FormGroup } from "react-bootstrap";
import classes from "./SignInStyle.module.css";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
export default function SingInButton({
    icon,
    text,
    variant = "dark",
    iconBorder = "white",
}) {
    return (
        <FormGroup className={`w-100  p-0 mt-3 rounded border`}>
            <div
                css={css`
                    width: 10%;
                    text-align: center;
                `}
                className="btn d-inline-block text-white"
            >
                {icon}
            </div>
            <div
                css={css`
                    width: 90%;
                    font-size: 1.2rem;
                `}
                className={`btn btn-${variant} d-inline-block h-100 rounded-0`}
            >
                {text}
            </div>
        </FormGroup>
    );
}
