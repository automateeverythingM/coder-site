/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import { Image } from "react-bootstrap";
import ReactImageUploadComponent from "react-images-upload";
import { TiArrowUpThick } from "react-icons/ti";
import { auth, firestore } from "../../../../firebase";
import { connect } from "react-redux";

function ProfileAbout({ user }) {
    const [showEdit, setShowEdit] = useState("hidden");
    const [img, setImg] = useState("https://picsum.photos/280");
    const { photoURL, displayName } = user;
    const handleChange = async (files) => {
        const file = files[0];
        console.log("handleChange -> file", file);
        const fileRef = await firestore.child(file.name);
        await fileRef.put(file).catch((error) => {
            console.log(error);
        });
        const url = await fileRef.getDownloadURL();
        setImg(url);
        const userFetch = await auth.currentUser;
        console.log("ProfileAbout -> user", userFetch);
        await user.updateProfile({ photoURL: url });

        console.log("ProfileAbout -> user", userFetch);
    };
    return (
        <div
            css={css`
                position: relative;
                width: 280px;
                height: 280px;
            `}
            onMouseEnter={() => setShowEdit("visible")}
            onMouseLeave={() => setShowEdit("hidden")}
        >
            <Image
                style={{ width: "280px", height: "280px", objectFit: "cover" }}
                fluid
                roundedCircle
                src={photoURL}
                className="border"
            />
            <ReactImageUploadComponent
                onChange={handleChange}
                withIcon={false}
                imgExtension={[".jpg", ".jpeg", ".png"]}
                withLabel={false}
                maxFileSize={5242880}
                buttonText={<TiArrowUpThick size="2rem" />}
                singleImage
                fileContainerStyle={{
                    background: "transparent",
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    padding: 0,
                    margin: 0,
                }}
                buttonStyles={{
                    visibility: showEdit,
                    fontWeight: "bold",
                }}
                buttonClassName="btn btn-danger text-white p-1 m-0 rounded-circle"
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout);
