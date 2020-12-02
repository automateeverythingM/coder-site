import React from "react";
import { Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import classes from "./notif.module.css";
export default function NotifIcon({ count }) {
    return (
        <span className={classes.notif}>
            <Badge className={`bg-danger ${classes["notif-icon"]}`}>13</Badge>
            <FaBell size="1.5em" />
        </span>
    );
}
