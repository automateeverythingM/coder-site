/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { Button } from "react-bootstrap";
import HeroPractice from "../../Hero/HeroPractice";
import HeroRejected from "../../Hero/HeroRejected";
import HeroSearch from "../../Hero/HeroSearch";
import { store } from "react-notifications-component";

const style = css`
    position: relative;
`;
const button = css`
    position: absolute;
    top: 0;
`;

export default function index() {
    return (
        <div css={style}>
            <HeroSearch />
            <HeroRejected />
            <HeroPractice />
            <Button
                size="lg"
                variant="danger"
                onClick={() => {
                    store.addNotification({
                        title: "Wonderful!",
                        message: "teodosii@react-notifications-component",
                        type: "info",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            pauseOnHover: true,
                        },
                        onRemoval: (id, removedBy) => {
                            console.log("index -> removedBy", removedBy);
                            console.log("index -> id", id);
                        },
                    });
                }}
                css={button}
            >
                Push Notification
            </Button>
        </div>
    );
}
