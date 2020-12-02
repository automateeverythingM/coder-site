import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import MessageList from "./Messages/MessageList";
import ProjectTab from "./Projects/ProjectTab";
export default function ProfileTabs() {
    const [key, setKey] = useState("projects");
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
            <Tab eventKey="messages" title="Messages" className="p-4">
                <MessageList />
            </Tab>
        </Tabs>
    );
}
