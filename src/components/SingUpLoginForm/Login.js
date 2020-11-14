/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Link } from "react-router-dom";
import ButtonWithLoadingDisable from "../UI/Buttons/ButtonWithLoadingDisable";
import SignInButton from "../UI/Buttons/SingInButton";
import sleep from "./sleep";

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

export default function Login() {
    const [submitting, setSubmitting] = useState(false);
    let email, password;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await sleep(1500);
        setSubmitting(false);
    };
    return (
        <Container css={container}>
            <h1>Login</h1>
            <Form
                onSubmit={handleSubmit}
                noValidate
                css={form}
                className="bg-dark text-white"
            >
                <Form.Group>
                    <Form.Label>Username or email</Form.Label>
                    <Form.Control
                        ref={(ref) => {
                            email = ref;
                        }}
                        placeholder="Enter username or email"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={(ref) => {
                            password = ref;
                        }}
                        type="password"
                        placeholder="Enter Password"
                    />
                </Form.Group>
                <div className="mt-4">
                    <ButtonWithLoadingDisable
                        disabled={submitting}
                        type="submit"
                        onlySpinner
                        block
                        size="md"
                        variant="danger"
                        spinnerProps={{ animation: "border", variant: "white" }}
                        onClick={() => {}}
                    >
                        Login
                    </ButtonWithLoadingDisable>
                    <SignInButton
                        variant="light"
                        icon={<ImGithub size="1.7rem" color="#202122" />}
                        text="Sing up with Github"
                        iconBorder="#202122"
                    />
                    <SignInButton
                        variant="light"
                        icon={<FcGoogle size="1.7rem" />}
                        text="Sing up with Google"
                        iconBorder="#202122"
                    />
                </div>

                <div className="text-center mt-2">
                    Don`t have account?{" "}
                    <b>
                        <Link className="text-warning" to="/signup">
                            SignUp
                        </Link>
                    </b>
                </div>
            </Form>
        </Container>
    );
}
