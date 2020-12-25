/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { Button } from "react-bootstrap";
import HeroPractice from "./Hero/HeroPractice";
import HeroRejected from "./Hero/HeroRejected";
import HeroSearch from "./Hero/HeroSearch";
import { store } from "react-notifications-component";
import "animate.css/animate.compat.css";
import NotificationItemPopUp from "../../UI/Notification/NotificationItemPopUp";
import { nanoid } from "nanoid";
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
                        insert: "bottom",
                        container: "top-right",
                        animationIn: [
                            "animate__animated",
                            "animate__fadeInDown",
                        ],
                        animationOut: [
                            "animate__animated",
                            "animate__fadeOutUp",
                        ],
                        dismiss: {
                            duration: 3000,
                            pauseOnHover: true,
                        },
                        slidingExit: {
                            duration: 0,
                            timingFunction: "ease-out",
                            delay: 1000,
                        },
                        width: 400,
                        onRemoval: (id, removedBy) => {
                            console.log("index -> removedBy", removedBy);
                            console.log("index -> id", id);
                        },
                        // content: (
                        //     <NotificationItemPopUp imgSrc="https://picsum.photos/50" />
                        // ),
                    });
                }}
                css={button}
            >
                Push Notification
            </Button>
            <label className="display-1" htmlFor="">
                {nanoid(10)}
            </label>
        </div>
    );
}
