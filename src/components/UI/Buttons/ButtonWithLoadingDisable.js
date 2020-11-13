import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function ButtonWithLoadingDisable({
    disabled,
    children,
    AsSpinner = Spinner,
    spinnerProps,
    onlySpinner,
    ...props
}) {
    const displayChildren = () => {
        if (onlySpinner && disabled) {
            return null;
        } else {
            return children;
        }
    };

    return (
        <Button disabled={disabled} {...props}>
            {disabled && <AsSpinner {...spinnerProps} />}
            {displayChildren()}
        </Button>
    );
}
