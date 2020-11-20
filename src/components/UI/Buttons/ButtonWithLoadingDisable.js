import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function ButtonWithLoadingDisable({
    disabled,
    children,
    loading,
    AsSpinner = Spinner,
    spinnerProps,
    onlySpinner,
    ...props
}) {
    const displayChildren = () => {
        if (onlySpinner && loading) {
            return null;
        } else {
            return children;
        }
    };

    return (
        <Button disabled={disabled} {...props}>
            {loading && <AsSpinner {...spinnerProps} />}
            {displayChildren()}
        </Button>
    );
}
