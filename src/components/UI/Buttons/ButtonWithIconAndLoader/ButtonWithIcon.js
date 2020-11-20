/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx, keyframes } from "@emotion/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { darken, grayscale, transparentize } from "polished";

const Button = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.block ? "100%" : "")};
    padding: 0.7em 0.9em;
    color: ${(props) => props.color || "white"};
    vertical-align: middle;
    font-size: 1em;
    text-align: center;
    font-weight: 700;
    background: ${(props) => props.background || "#dd4b39"};
    border: 0;
    outline: 0;
    border-radius: 0.3em;

    &:hover {
        background: ${(props) => darken(0.05, props.background || "#DD4B39")};
    }

    &:active {
        background: ${(props) => darken(0.08, props.background || "#DD4B39")};
        outline: 0;
    }

    &:disabled {
        background: ${(props) => grayscale(props.background || "#DD4B39")};
    }
    &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px
            ${(props) => darken(0.2, props.background || "#DD4B39")};
    }

    ${(props) =>
        props.onlySpinner &&
        props.loading &&
        css`
            color: #ffffff00;
        `}
`;

const rotate = keyframes`
  0%{
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const MSpinner = styled.div`
    display: inline-block;
    width: ${(props) => props.size || "1.7rem"};
    height: ${(props) => props.size || "1.7rem"};
    margin: 0 0.3em;
    border-radius: 50%;
    border-left: 0.3rem solid
        ${(props) => transparentize(0.7, props.background || "whitesmoke")};
    border-right: 0.3rem solid
        ${(props) => transparentize(0.7, props.background || "whitesmoke")};
    border-bottom: 0.3rem solid
        ${(props) => transparentize(0.7, props.background || "whitesmoke")};

    border-top: 0.3rem solid ${(props) => props.background || "whitesmoke"};

    ${(props) =>
        props.onlySpinner &&
        css`
            position: absolute;
            margin: 0;
        `}

    animation: ${rotate} 0.7s infinite linear;
`;

export const ContainerSpinner = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0.3em;
    background: ${(props) => props.background || "black"};
`;

export default function ButtonWithIcon({
    children,
    icon: Icon,
    loading,
    iconPosition = "left",
    onlySpinner,
    spinner: Spinner = MSpinner,
    spinnerProps,
    ...rest
}) {
    const displayChildren = () => {
        if (onlySpinner && loading) {
            return (
                <React.Fragment>
                    <Spinner onlySpinner {...spinnerProps} />
                    {children}
                </React.Fragment>
            );
        } else if (loading) {
            return (
                <React.Fragment>
                    <Spinner {...spinnerProps} />
                    {children}
                </React.Fragment>
            );
        } else {
            return children;
        }
    };

    return (
        <Button onlySpinner={onlySpinner} loading={loading} {...rest}>
            {Icon && (
                <Icon
                    css={css`
                        position: absolute;
                        top: 0;
                        left: ${iconPosition === "left" && 0};
                        right: ${iconPosition === "right" && 0};
                        height: 100%;
                        width: 4rem;
                        padding: 0.5em;
                        border-radius: 0;
                        text-align: center;
                        font-size: 1em;
                        border-right: 3px solid whitesmoke;
                        color: whitesmoke;
                    `}
                />
            )}
            {displayChildren()}
        </Button>
    );
}
