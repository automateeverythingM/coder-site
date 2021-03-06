/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useRef, useState } from "react";
import {
    Image,
    Modal,
    Spinner,
    Row,
    OverlayTrigger,
    Tooltip,
    FormLabel,
} from "react-bootstrap";
import { TiArrowUpThick } from "react-icons/ti";
import ReactImageUploadComponent from "react-images-upload";
import { connect } from "react-redux";
import { database, storage } from "../../../../../firebase";
import AvatarEditor from "react-avatar-editor";
import ButtonWithIcon from "../../../../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";

function Avatar({ userProfileData, uid }) {
    const [showEdit, setShowEdit] = useState("hidden");
    const [fileLoaded, setFileLoaded] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);
    const [userRef] = useState(database.ref("users").child(uid));
    const [showModal, setShowModal] = useState(false);
    const [scale, setScale] = useState(1.2);
    const [rotate, setRotate] = useState(0);
    const editorRef = useRef();
    const scaleRangeRef = useRef();
    const rotateRangeRef = useRef();

    const { avatar_url } = userProfileData;

    const handleCloseModal = () => {
        setShowModal(false);
        setFileLoaded(null);
        setImgLoading(false);
        setScale(1);
        setRotate(0);
    };

    const handleImageUpload = async () => {
        // const canvas = editor.current.getImage();
        handleCloseModal();
        const imgDataUrl = editorRef.current
            .getImageScaledToCanvas()
            .toDataURL();

        setImgPreview(imgDataUrl);

        try {
            const response = await fetch(imgDataUrl);
            const blob = await response.blob();
            const fileRef = storage.child("avatars").child(uid);
            await fileRef.put(blob);
            const url = await fileRef.getDownloadURL();
            await userRef.update({ avatar_url: url });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleChange = async (files) => {
        setImgLoading(true);
        const file = files[0];
        if (file) {
            setFileLoaded(file);
            handleOpenModal();
        }
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
                        border={50}
                        color={[0, 0, 0, 0.7]} // RGBA
                        scale={scale}
                        rotate={rotate}
                        borderRadius={140}
                        ref={editorRef}
                    />
                    <Row>
                        <FormLabel>Zoom</FormLabel>
                        <OverlayTrigger
                            target={scaleRangeRef.current}
                            placement={"top"}
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip>{scale}</Tooltip>}
                        >
                            <input
                                type="range"
                                min={1}
                                max={10}
                                step={0.1}
                                value={scale}
                                ref={scaleRangeRef}
                                onChange={(e) => setScale(e.target.value)}
                                className="form-control-range"
                            />
                        </OverlayTrigger>
                        <FormLabel>Rotate</FormLabel>
                        <OverlayTrigger
                            target={scaleRangeRef.current}
                            placement={"top"}
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip>{rotate}</Tooltip>}
                        >
                            <input
                                type="range"
                                min={0}
                                max={360}
                                step={1}
                                value={rotate}
                                ref={rotateRangeRef}
                                onChange={(e) => setRotate(e.target.value)}
                                className="form-control-range"
                            />
                        </OverlayTrigger>
                    </Row>
                </Modal.Body>
                <ButtonWithIcon
                    background="#90be6d"
                    onClick={handleImageUpload}
                >
                    Update
                </ButtonWithIcon>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userProfileData: state.userReducer.userProfileData,
    uid: state.userReducer.currentUser.uid,
});

export default connect(mapStateToProps)(Avatar);
