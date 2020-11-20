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
    disabled,
    onClick,
    loading,
    onlySpinner = true,
    spinnerProps,
    ...rest
}) {
    return (
        <FormGroup
            {...rest}
            className={`w-100 btn btn-${variant} d-flex p-0 mt-3 rounded border overflow-hidden align-items-center mb-0`}
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
                className="mt-0 border-0 shadow-none font-weight-bold"
                variant={variant}
                disabled={disabled}
                loading={loading}
                spinnerProps={spinnerProps}
                onlySpinner={onlySpinner}
                onClick={onClick}
            >
                {text}
            </ButtonWithLoadingDisable>
        </FormGroup>
    );
}
