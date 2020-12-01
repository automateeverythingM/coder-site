import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Badge } from "react-bootstrap";
import data from "../../../../mocks/skills";
export default function SkillsInfo() {
    return (
        <div
            css={css`
                font-size: 1.2rem;
                user-select: none;
            `}
            className="mt-3 text-left"
        >
            {data.map(({ name, id }) => (
                <Badge
                    key={id}
                    variant="warning"
                    className="mr-1"
                >
                    {name}
                </Badge>
            ))}
        </div>
    );
}
