import React, { useState } from "react";
import { Badge, Tab, Tabs } from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import MessageList from "./Messages/MessageList";
import ProjectTab from "./Projects/ProjectTab";
export default function ProfileTabs() {
    const [key, setKey] = useState("projects");

    const newMessage = (newMessageNumber) => {
        if (newMessageNumber) {
            return (
                <span
                    css={css`
                        position: relative;
                    `}
                >
                    Message
                    <Badge
                        css={css`
                            position: absolute;
                            top: -0.5rem;
                            right: -0.8rem;
                        `}
                        variant="danger"
                    >
                        {newMessageNumber}
                    </Badge>
                </span>
            );
        }

        return "Message";
    };

    return (
        <Tabs
            defaultActiveKey={key}
            id="profile-tabs"
            onSelect={(k) => setKey(k)}
            className="pt-3"
            css={css`
                a {
                    font-weight: bold;
                    color: #aaa;
                    &:hover {
                        color: #555;
                        border: none;
                    }
                }
            `}
        >
            <Tab eventKey="projects" title="Projects" className="p-4">
                <ProjectTab />
            </Tab>
            <Tab
                eventKey="messages"
                title={newMessage(2)}
                className="py-4 pr-4"
            >
                <MessageList />
            </Tab>
        </Tabs>
    );
}
