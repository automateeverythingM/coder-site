import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import {
    FormLabel,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { database, storage } from "../../../../../firebase";
import ButtonWithIcon from "../../../../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";

export default function ImageUploadModal({
    handleCloseModal,
    fileLoaded,
    setImgPreview,
    showModal,
}) {
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const editorRef = useRef();
    const scaleRangeRef = useRef();
    const rotateRangeRef = useRef();
    const uid = useSelector((state) => state.userReducer.currentUser.uid);
    const [userRef] = useState(database.ref("users").child(uid));

    const handleHideModal = () => {
        setScale(1);
        setRotate(0);
        handleCloseModal();
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

    return (
        <Modal
            show={showModal}
            onHide={handleHideModal}
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
            <ButtonWithIcon background="#90be6d" onClick={handleImageUpload}>
                Update
            </ButtonWithIcon>
        </Modal>
    );
}
