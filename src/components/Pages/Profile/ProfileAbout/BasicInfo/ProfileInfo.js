import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import SkillsInfo from "./SkillsInfo";
import StatsInfo from "./StatsInfo";
export default function ProfileInfo() {
    return (
        <div className="mt-3 text-center">
            <h3>Marko Pavic</h3>
            github: <a href="#github">automateEverything</a>
            <StatsInfo />
            <SkillsInfo />
        </div>
    );
}
