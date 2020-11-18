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
        <div>
            <Avatar />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout);
