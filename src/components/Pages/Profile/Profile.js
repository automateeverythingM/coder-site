/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { connect } from "react-redux";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import ProfileTabs from "./ProfileTabs/ProfileTabs";

function Profile({ user }) {
    console.log("Profile -> user", user);

    return (
        <div
            css={css`
                display: flex;
                height: 100%;
                background: linear-gradient(
                    to right,
                    #202122 50%,
                    whitesmoke 50%
                );
            `}
        >
            <div className="container">
                <div className="row">
                    <div className="col-4 bg-dark text-white">
                        <ProfileAbout />
                    </div>
                    <div className="col-8 bg-white text-dark">
                        <ProfileTabs />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
