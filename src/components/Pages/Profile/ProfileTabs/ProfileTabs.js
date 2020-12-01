import React, { useState } from "react";
import { Button, OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BsFilePlus } from "react-icons/bs";
import ButtonWithIcon from "../../../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";

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
                <div
                    css={css`
                        height: 100vh;
                    `}
                >
                    <OverlayTrigger
                        overlay={
                            <Tooltip variant="dark" className="border-0">
                                add new project
                            </Tooltip>
                        }
                    >
                        <ButtonWithIcon
                            background="transparent"
                            color="dark"
                            className="d-inline p-1"
                        >
                            <BsFilePlus color="green" size="2rem" />
                        </ButtonWithIcon>
                    </OverlayTrigger>
                </div>
            </Tab>
            <Tab eventKey="description" title="Description" className="p-4">
                asdasdasdasd
            </Tab>
            <Tab eventKey="location" title="Location" className="p-4">
                asdasdas
            </Tab>
        </Tabs>
    );
}
