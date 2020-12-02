import React from "react";
import NotificationItemPopUp from "../../../../UI/Notification/NotificationItemPopUp";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
export default function MessageList() {
    return (
        <div>
            <NotificationItemPopUp
                imgSrc="https://picsum.photos/50"
                alt="avatar"
                imgSize="60px"
                contentMsg={
                    <div className="ml-3">
                        <div className="text-warning font-weight-bold">
                            Marko
                        </div>
                        <div
                            css={css`
                                font-size: 0.7rem;
                            `}
                        >
                            Hello, how are you?
                        </div>
                        <div>...</div>
                    </div>
                }
            />
            <NotificationItemPopUp
                imgSrc="https://picsum.photos/250"
                alt="avatar"
                imgSize="60px"
                contentMsg={
                    <div className="ml-3">
                        <div className="text-warning font-weight-bold">
                            Djordje
                        </div>
                        <div
                            css={css`
                                font-size: 0.7rem;
                            `}
                        >
                            Can you help me with this?
                        </div>
                        <div>...</div>
                    </div>
                }
            />
            <NotificationItemPopUp
                imgSrc="https://picsum.photos/150"
                alt="avatar"
                imgSize="60px"
                contentMsg={
                    <div className="ml-3">
                        <div className="text-warning font-weight-bold">
                            John Smith
                        </div>
                        <div
                            css={css`
                                font-size: 0.7rem;
                            `}
                        >
                            Call me!
                        </div>
                        <div>...</div>
                    </div>
                }
            />
            <NotificationItemPopUp
                imgSrc="https://picsum.photos/70"
                alt="avatar"
                imgSize="60px"
                contentMsg={
                    <div className="ml-3">
                        <div className="text-warning font-weight-bold">
                            Diann
                        </div>
                        <div
                            css={css`
                                font-size: 0.7rem;
                            `}
                        >
                            Look at this code.
                        </div>
                        <div>...</div>
                    </div>
                }
            />
        </div>
    );
}
