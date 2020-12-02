import React from "react";
import ProjectCard from "./ProjectCard";
import dataProjectCards from "../../../../mocks/ProjectCardMock";
export default function ProjectCards({ data = dataProjectCards }) {
    return (
        <>
            {data.map((project) => (
                <ProjectCard {...project} />
            ))}
        </>
    );
}
