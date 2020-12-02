import React from "react";
import NotificationItemPopUp from "../../../../UI/Notification/NotificationItemPopUp";
import MessageCard from "./MessageCard";
import dataMsgCards from "../../../../mocks/messageListWithPreview";
export default function MessageList({ data = dataMsgCards }) {
    return (
        <>
            {data.map(({ id, imgSrc, alt, msgData }) => (
                <NotificationItemPopUp
                    key={id}
                    imgSrc={imgSrc}
                    alt={alt}
                    imgSize="60px"
                    contentMsg={<MessageCard {...msgData} />}
                />
            ))}
        </>
    );
}
