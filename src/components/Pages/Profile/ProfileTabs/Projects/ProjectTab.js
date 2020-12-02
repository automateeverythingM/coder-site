import { css } from "@emotion/react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ButtonWithIcon from "../../../../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";
import { BsFilePlus } from "react-icons/bs";
import ProjectCards from "./ProjectCards";
import React from "react";

function ProjectTab() {
    return (
        <div
            css={css`
                height: 100vh;
            `}
        >
            <OverlayTrigger
                overlay={<Tooltip variant="dark">add new project</Tooltip>}
            >
                <ButtonWithIcon background="transparent" className="p-1 my-3">
                    <BsFilePlus color="green" size="2rem" />
                </ButtonWithIcon>
            </OverlayTrigger>
            <ProjectCards />
        </div>
    );
}

export default ProjectTab;
