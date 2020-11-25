/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import { connect } from "react-redux";
import Avatar from "./ProfileAvatar/Avatar";
import AvatarEditor from "react-avatar-editor";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
function ProfileAbout({ user, token }) {
    const [showEdit, setShowEdit] = useState("hidden");
    const [crop, setCrop] = useState({
        x: 50,
        y: 50,
        width: 280,
        height: 280,
        aspectRatio: 1,
    });
    const onChange = (crop) => {
        setCrop(crop);
    };
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
            <AvatarEditor image="../../../../img/fb-free-seo-tools.png" />

            <div className="w-100 d-flex justify-content-center"></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser,
});

export default connect(mapStateToProps)(ProfileAbout);
