/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import ButtonWithIcon from "../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";
import { delay } from "loadsh";
import NotificationItemPopUp from "../UI/Notification/NotificationItemPopUp";
import { store } from "react-notifications-component";
import { RiMailSendLine } from "react-icons/ri";

const container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
`;
const form = css`
    padding: 2rem 1.5rem;
    border-radius: 1rem;
    width: 60%;
`;
const RetrieveForgottenPassword = () => {
    const { register, handleSubmit, errors } = useForm();
    const [serverFetchError, setServerFetchError] = useState();
    const history = useHistory();
    const onSubmit = async (data) => {
        try {
            await auth.sendPasswordResetEmail(data.email);
            store.addNotification({
                title: "Password reset",
                message: `Password reset email is sent to ${data.email}`,
                type: "success",
                insert: "bottom",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeInDown"],
                animationOut: ["animate__animated", "animate__fadeOutUp"],
                dismiss: {
                    duration: 3000,
                    pauseOnHover: true,
                },
                slidingExit: {
                    duration: 0,
                    timingFunction: "ease-out",
                    delay: 1000,
                },
                width: 400,
                onRemoval: (id, removedBy) => {
                    console.log("index -> removedBy", removedBy);
                    console.log("index -> id", id);
                },
                content: (
                    <Alert variant="success" className="row h-100">
                        <div className="col-4 d-flex align-items-center">
                            <RiMailSendLine size="3rem" className="w-100" />
                        </div>
                        <div className="col-8">
                            <h3>Password reset</h3>
                            <div>
                                Password reset email is sent to {data.email}
                            </div>
                        </div>
                    </Alert>
                ),
            });
            delay(() => history.push("/login"), 5000);
        } catch (error) {
            setServerFetchError(error);
        }
    };

    return (
        <Container css={container}>
            <h1>Reset Password</h1>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                css={form}
                className="bg-dark text-white"
            >
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        ref={register({
                            required: "Please enter a valid email",
                        })}
                        placeholder="Enter email"
                        isInvalid={errors.email && errors.email.message}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email && errors.email.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <ButtonWithIcon type="submit" block className="mt-3">
                    Send Reset Email
                </ButtonWithIcon>
                {serverFetchError && (
                    <Alert className="text-center mt-3" variant="danger">
                        {serverFetchError.message}
                    </Alert>
                )}
            </Form>
        </Container>
    );
};

export default RetrieveForgottenPassword;
