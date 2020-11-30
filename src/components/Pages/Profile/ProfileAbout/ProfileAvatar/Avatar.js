/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { Suspense, useState, lazy } from "react";
import { Image, Spinner } from "react-bootstrap";
import { TiArrowUpThick } from "react-icons/ti";
import ReactImageUploadComponent from "react-images-upload";
import { connect } from "react-redux";
const ImageUploadModal = lazy(() => import("./ImageUploadModal"));

function Avatar({ userProfileData }) {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState("hidden");
    const [fileLoaded, setFileLoaded] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);

    const { avatar_url } = userProfileData;

    const handleCloseModal = () => {
        setShowModal(false);
        setFileLoaded(null);
        setImgLoading(false);
    };

    const handleChange = async (files) => {
        setImgLoading(true);
        const file = files[0];
        if (file) {
            setFileLoaded(file);
            handleOpenModal();
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
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

            <Suspense fallback={<div>Loading...</div>}>
                <ImageUploadModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    handleOpenModal={handleOpenModal}
                    fileLoaded={fileLoaded}
                    setImgPreview={setImgPreview}
                />
            </Suspense>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userProfileData: state.userReducer.userProfileData,
    uid: state.userReducer.currentUser.uid,
});

export default connect(mapStateToProps)(Avatar);
