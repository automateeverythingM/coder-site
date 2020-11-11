import React from "react";
import { FaBell } from "react-icons/fa";
import classes from "./notif.module.css";
export default function NotifIcon({ count }) {
  return (
    <span className={classes.notif}>
      <span className={`bg-danger ${classes["notif-icon"]}`}>13</span>
      <FaBell size="1.5em" />
    </span>
  );
}
