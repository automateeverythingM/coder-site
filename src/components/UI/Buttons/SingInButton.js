import React from "react";
import { FormGroup } from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import ButtonWithLoadingDisable from "./ButtonWithLoadingDisable";
export default function SingInButton({
    icon,
    text,
    variant = "dark",
    iconBorder = "white",
    ...rest
}) {
    return (
        <FormGroup
            {...rest}
            className="w-100 btn btn-light d-flex p-0 mt-3 rounded border overflow-hidden align-items-center mb-0"
        >
            <div
                css={css`
                    flex: 0 0 10%;
                    text-align: center;
                    border-right: 3px solid ${iconBorder};
                `}
                className="h-100 btn rounded-0 d-inline-block text-white"
            >
                {icon}
            </div>
            <ButtonWithLoadingDisable
                block
                className="mt-0 border-0 shadow-none"
                variant="white"
            >
                {text}
            </ButtonWithLoadingDisable>
        </FormGroup>
    );
}
