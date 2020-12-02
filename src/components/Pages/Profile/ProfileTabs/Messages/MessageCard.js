import React from "react";
import { Badge } from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
function MessageCard({ isNewMessage, messagePreview, sender }) {
    return (
        <div className="ml-3">
            <div className="text-warning font-weight-bold">
                {sender} {isNewMessage && <Badge variant="danger">New</Badge>}
            </div>
            <div
                css={css`
                    font-size: 0.7rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 330px;
                `}
            >
                {messagePreview}
            </div>
        </div>
    );
}

export default MessageCard;
