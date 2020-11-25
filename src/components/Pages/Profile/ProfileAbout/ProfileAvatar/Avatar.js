/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Button, Image, Modal, Spinner } from "react-bootstrap";
import { TiArrowUpThick } from "react-icons/ti";
import ReactImageUploadComponent from "react-images-upload";
import { connect } from "react-redux";
import { database, storage } from "../../../../../firebase";
import Resizer from "react-image-file-resizer";
import AvatarEditor from "react-avatar-editor";

function Avatar({ userProfileData, uid }) {
    const [showEdit, setShowEdit] = useState("hidden");
    const [fileLoaded, setFileLoaded] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);
    const [userRef] = useState(database.ref("users").child(uid));
    const [showModal, setShowModal] = useState(false);
    const { avatar_url } = userProfileData;

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

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
        setFileLoaded(file);
        handleOpenModal();

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setImgPreview(reader.result);
        // };
        // reader.readAsDataURL(file);

        //! ***********************
        // const fileRef = await storage.child(file.name);
        // const image = await resizeFile(file);
        // console.log("Avatar -> image", image);
        // await fileRef.put(image).catch((error) => console.log(error));

        // const url = await fileRef.getDownloadURL();
        // await userRef.update({ avatar_url: url });
        // setImgLoading(false);
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
                fluid
                roundedCircle
                src={imgPreview ? imgPreview : avatar_url}
                className={`${!imgLoading && "border"}`}
                onLoad={handleImageLoaded}
                css={css`
                    min-width: 100%;
                    min-height: 100%;
                    width: 100%;
                    height: 100%;
                `}
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

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="d-flex justify-content-center bd-dark"
            >
                <Modal.Header closeButton>
                    Set your new profile picture
                </Modal.Header>
                <Modal.Body>
                    <AvatarEditor
                        image={fileLoaded}
                        width={280}
                        height={280}
                        border={2}
                        color={[0, 0, 0, 0.7]} // RGBA
                        scale={1}
                        rotate={0}
                        borderRadius={140}
                    />
                </Modal.Body>
                <Button variant="danger">Cancel</Button>
                <Button variant="dark">Upload</Button>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userProfileData: state.userReducer.userProfileData,
    uid: state.userReducer.currentUser.uid,
});

export default connect(mapStateToProps)(Avatar);
