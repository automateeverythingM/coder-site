import React from "react";
import { CloseTag, LiTag, TagLabel } from "../StyledComp";

export default function TagStyledComponent({
    label,
    backgroundColor = "#709fb0",
    selectedTag,
    indx,
}) {
    return (
        <LiTag backgroundColor={backgroundColor} selected={selectedTag}>
            <TagLabel>{label}</TagLabel>
            <CloseTag
                data-id={indx}
                selected={selectedTag}
                backgroundColor={backgroundColor}
            >
                &times;
            </CloseTag>
        </LiTag>
    );
}
