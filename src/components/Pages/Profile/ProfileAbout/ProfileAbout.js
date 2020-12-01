/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import { connect } from "react-redux";
import Avatar from "./ProfileAvatar/Avatar";
import ProfileInfo from "./BasicInfo/ProfileInfo";
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
                height: 100vh;
            `}
        >
            <Avatar />
            <ProfileInfo />
            <div className="w-100 d-flex justify-content-center"></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser,
});

export default connect(mapStateToProps)(ProfileAbout);
