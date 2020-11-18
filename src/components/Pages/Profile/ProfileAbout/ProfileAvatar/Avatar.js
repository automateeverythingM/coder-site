/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import { TiArrowUpThick } from "react-icons/ti";
import ReactImageUploadComponent from "react-images-upload";
import { connect } from "react-redux";
import { storage } from "../../../../../firebase";
import Resizer from "react-image-file-resizer";

function Avatar({ user }) {
    const [showEdit, setShowEdit] = useState("hidden");
    const [imgPreview, setImgPreview] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);
    const { photoURL } = user;

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                "blob",
                280,
                280
            );
        });

    const handleChange = async (files) => {
        setImgLoading(true);
        const file = files[0];
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setImgPreview(reader.result);
        // };
        // reader.readAsDataURL(file);
        const fileRef = await storage.child(file.name);
        const image = await resizeFile(file);
        console.log("Avatar -> image", image);
        await fileRef.put(image).catch((error) => console.log(error));

        const url = await fileRef.getDownloadURL();
        await user.updateProfile({ photoURL: url });
        setImgLoading(false);
    };
    const handleImageLoaded = () => {
        setImgLoading(false);
    };
    return (
        <div
            css={css`
                position: relative;
                display: flex;
                align-items: center;
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
                src={imgPreview ? imgPreview : photoURL}
                className={`${!imgLoading && "border"}`}
                onLoad={handleImageLoaded}
            />
            {imgLoading && (
                <Spinner
                    css={css`
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    `}
                    size="100%"
                    animation="border"
                    variant="danger"
                />
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
