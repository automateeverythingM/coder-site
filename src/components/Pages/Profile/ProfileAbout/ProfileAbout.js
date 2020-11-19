/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import { Image } from "react-bootstrap";
import ReactImageUploadComponent from "react-images-upload";
import { TiArrowUpThick } from "react-icons/ti";
import { auth, firestore, storage } from "../../../../firebase";
import { connect } from "react-redux";
import Avatar from "./ProfileAvatar/Avatar";

function ProfileAbout({ user, token }) {
    const [showEdit, setShowEdit] = useState("hidden");

    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100vh;
                padding-top: 50px;
                color: whitesmoke;
            `}
        >
            <Avatar />
            <div>
                <p></p>
                <a href="#s">sda</a>
            </div>
            <div className="w-100 d-flex justify-content-center"></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout);
