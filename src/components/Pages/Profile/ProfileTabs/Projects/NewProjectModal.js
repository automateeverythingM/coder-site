import React, { useEffect } from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ButtonWithIcon from "../../../../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";
import { useDispatch } from "react-redux";
import { addProject } from "../../../../../store/reducers/projectReducer";
export default function NewProjectModal({ showModal, handleCloseModal }) {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(
            "🚀 ~ file: NewProjectModal.js ~ line 9 ~ NewProjectModal ~ errors",
            errors
        );
    }, [errors]);

    const onSubmit = (data) => {
        dispatch(addProject(data));
        handleCloseModal();
    };
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header
                css={css`
                    & button.close {
                        color: whitesmoke;
                    }
                `}
                className="bg-dark text-light"
                closeButton
            >
                New Project
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Project Name</Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="title"
                                ref={register({
                                    required: "Project title is required",
                                })}
                                type="text"
                                isInvalid={errors.title && errors.title.message}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title && errors.title.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="description"
                                ref={register({
                                    required: "Description is required",
                                    minLength: {
                                        value: 20,
                                        message:
                                            "Please enter at least 20 character description of your project",
                                    },
                                })}
                                as="textarea"
                                isInvalid={
                                    errors.description &&
                                    errors.description.message
                                }
                                rows={4}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description &&
                                    errors.description.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Im looking for</Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="lookingFor"
                                ref={register({
                                    required:
                                        "Please enter your requirements for participating in this project",
                                })}
                                as="textarea"
                                rows={4}
                                isInvalid={
                                    errors.lookingFor &&
                                    errors.lookingFor.message
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lookingFor && errors.lookingFor.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <ButtonWithIcon type="submit" block>
                        Add new project
                    </ButtonWithIcon>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
