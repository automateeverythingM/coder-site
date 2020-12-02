import React from "react";
import ProjectCard from "./ProjectCard";
import dataProjectCards from "../../../../mocks/ProjectCardMock";
import { useSelector } from "react-redux";
export default function ProjectCards({ data = dataProjectCards }) {
    const projects = useSelector((state) => state.projectReducer.listOfProject);
    return (
        <>
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </>
    );
}
