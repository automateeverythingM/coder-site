import React, { useState } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import ButtonWithIcon from "../../../../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";
import { BsFilePlus } from "react-icons/bs";
import ProjectCards from "./ProjectCards";
import NewProjectModal from "./NewProjectModal";

function ProjectTab() {
    const [showModal, setShowModal] = useState(true);
    const handleNewProjectClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div
            css={css`
                height: 100vh;
            `}
        >
            <OverlayTrigger
                overlay={<Tooltip variant="dark">add new project</Tooltip>}
            >
                <ButtonWithIcon
                    background="transparent"
                    className="p-1 my-3"
                    onClick={handleNewProjectClick}
                >
                    <BsFilePlus color="green" size="2rem" />
                </ButtonWithIcon>
            </OverlayTrigger>
            <ProjectCards />
            <NewProjectModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
            />
        </div>
    );
}

export default ProjectTab;
