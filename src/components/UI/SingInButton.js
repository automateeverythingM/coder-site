import React from "react";
import { Button, FormGroup } from "react-bootstrap";
import classes from "./SignInStyle.module.css";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
export default function SingInButton({
  icon,
  text,
  variant = "dark",
  iconBorder = "white",
}) {
  return (
    <FormGroup className={`btn btn-${variant}  w-100 border m-0 mt-3`}>
      <div
        css={css`
          width: 10%;
          border-right: 3px solid ${iconBorder};
        `}
        className={`${classes.icon} d-inline-block`}
      >
        {icon}
      </div>
      <div
        css={css`
          width: 90%;
        `}
        className={`d-inline-block`}
      >
        {text}
      </div>
    </FormGroup>
  );
}
