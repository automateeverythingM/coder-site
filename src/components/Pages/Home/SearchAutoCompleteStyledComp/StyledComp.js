import styled from "@emotion/styled";
import { css, jsx } from "@emotion/react";
import { lighten, darken } from "polished";

//!!!INPUTSTYLE

const dark = "#1c2321";
const light = "whitesmoke";

export const InputWrapper = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "100%"};
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 0.6em;
    box-shadow: 2px 3px 4px #090b0a;
    height: 4em;
    background: inherit;
    ${(props) =>
        props.showDropdown &&
        css`
            border-radius: 0.6em 0.6em 0 0;
        `};
`;

export const SearchInputs = styled.div`
    display: flex;
    width: 60%;
    align-items: center;
    border-radius: 0.6em 0 0 0.6em;
    background-color: ${(props) => props.backgroundColor || "whitesmoke"};
    padding: 0.2em 0 0.2em 0.5em;
    height: 100%;

    ${(props) =>
        props.showDropdown &&
        css`
            border-radius: 0.6em 0 0 0;
        `};
`;

export const SearchButton = styled.button`
    outline: none;
    border: none;
    height: 100%;
    width: 20%;
    background: #bbb;
    color: inherit;
    border-left: 3px solid transparent;
    cursor: pointer;
    padding: 0;
    border-radius: 0 0.6em 0.6em 0;

    transition: all 0.1s ease-in-out;

    &:hover {
        background: #999;
        border-left: 3px solid ${dark};
    }

    &:active {
        transform: scale(0.98);
        border-radius: 0 0.5em 0.5em 0;
    }

    &:focus {
    }

    ${(props) =>
        props.showDropdown &&
        css`
            border-radius: 0 0.6em 0 0;

            &:hover {
                border-bottom: 3px solid ${dark};
            }
        `}
`;

export const Input = styled.input`
    position: ${(props) => props.position || "absolute"};
    width: ${(props) => props.width || "3000px"};
    outline: none;
    border: none;
    color: ${(props) => props.color || "inherit"};
    padding-left: 0.1em;
    font-size: 1.5em;
    background: ${(props) => props.backgroundColor || "transparent"};
    z-index: ${(props) => props.zIndex};
`;

export const Button = styled.button`
    background: none;
    border: none;
    outline: none;
    height: 100%;
    width: 0%;
    transition: all 0.2s ease-in-out;
    &:active {
        filter: drop-shadow(0px 1px 0px #999);
    }
`;

export const Icon = styled(Button)`
    color: ${(props) => props.color || "inherit"};
    font-size: 0.5em;
    padding: 0 0.5em;

    &:hover {
        color: ${(props) => lighten(0.2, props.color)};
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const CloseButton = styled(Button)`
    visibility: ${(props) => (props.show ? "visible" : "hidden")};
    color: red;
    padding: 0 0.5em;
    font-size: 1.5em;
    margin-right: 0.5em;
    margin-bottom: 0;
    user-select: none;
    &:hover {
        color: ${(props) => darken(0.2, props.color)};
    }

    &:active {
        transform: scale(0.97);
    }
`;
//!!!INPUTSTYLE

//!! SearchACSC
export const RelativeContainer = styled.div`
    position: relative;
`;
//!! SearchACSC

//!Search dropdown
export const Ul = styled.ul`
    display: ${(props) => props.display};
    position: ${(props) => props.position};
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
`;
export const UlSelect = styled(Ul)`
    border-left: 3px solid transparent;
    z-index: 1010;
    display: none;

    &:focus {
        border: 1px solid red;
    }

    ${(props) =>
        props.show &&
        css`
            display: block;
        `}
`;

export const UlDropdown = styled(Ul)`
    border-bottom: 1px solid #eee;
    box-shadow: 0px 0px 1px #ddd;
    border-radius: 0 0 0.6em 0.6em;
    overflow: hidden;
    user-select: none;
    z-index: 1000;
`;

export const Li = styled.li`
    background-color: ${(props) => props.backgroundColor || "whitesmoke"};
    padding: 0.5em 0.5em;
    user-select: none;

    ${(props) =>
        props.selected &&
        css`
            background-color: #dedede;
            padding-left: 1em;
        `}
`;
//!Search dropdown

//! TAGS
export const CloseTag = styled.span`
    display: inline-block;
    align-self: center;
    margin-left: 0.2em;
    border: none;
    font-size: inherit;
    font-family: inherit;
    padding: 0 5px;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        box-shadow: 0px 1px 2px #555;
    }
    &:active {
        box-shadow: 0 -1px 1px #555;
    }
`;
export const LiTag = styled.li`
    display: inline-flex;
    justify-content: center;
    padding: 0.3em 0.3em 0.3em 0.5em;
    margin: 0 0.5em 0.5em 0px;
    border-radius: ${(props) => props.borderRadius || "4px"};
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.1s ease-in-out;
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 1px 1px 1px #111111;
    color: inherit;
    background-color: whitesmoke;

    &:hover {
        box-shadow: 0px 0px 3px 0px #111111;
    }
`;

export const TagLabel = styled.div`
    display: inline-block;
    text-decoration: none;
    color: ${(props) => props.textColor};
`;

export const Hr = styled.div`
    border-top: 1px solid rgb(204, 203, 203);
    width: 85%;
`;

export const HrWrapper = styled.div`
    background: whitesmoke;
    display: flex;
    justify-content: center;
`;

export const TitleMsg = styled.h1`
    text-align: center;
    color: whitesmoke;
    font-size: 4em;
    padding: 0;
    margin: 0;
    margin-bottom: 1em;
`;

export const Banner = styled.div`
    text-align: center;
    font-size: 3em;
    color: whitesmoke;
    margin-bottom: 1em;
    font-weight: bold;
    text-shadow: 5px 5px 5px black;
`;

export const SpanText = styled.span`
    display: inline-block;
    color: whitesmoke;
    text-align: center;
    vertical-align: middle;
    font-size: 15em;
`;

//! SELECT

export const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: whitesmoke;
    height: 100%;
    padding: 0 1em;
    border: none;
    border-left: 3px solid #ddd;

    cursor: pointer;

    &:hover {
        border-left: 3px solid ${dark};
    }
`;

export const SelectWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 20%;
`;

export const SelectLi = styled.li`
    text-align: center;
    cursor: pointer;
    background: whitesmoke;
    padding: 0.4em 0;

    ${(props) =>
        props.selected &&
        css`
            font-weight: bold;
        `}
    &:hover {
        background-color: #dedede;
    }
`;
//! SELECT
