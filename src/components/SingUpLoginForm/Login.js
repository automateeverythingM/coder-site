/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import ButtonWithLoadingDisable from "../UI/ButtonWithLoadingDisable";
import SignInButton from "../UI/SingInButton";

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

    return (
        <Container css={container}>
            <h1>Login</h1>
            <Form noValidate css={form} className="bg-dark text-white">
                <Form.Group>
                    <Form.Label>Username or email</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <ButtonWithLoadingDisable
                    disabled={submitting}
                    onlySpinner
                    block
                    size="lg"
                    variant="danger"
                    spinnerProps={{ animation: "border", variant: "white" }}
                >
                    Login
                </ButtonWithLoadingDisable>
                <SignInButton
                    variant="light"
                    icon={<ImGithub size="1.7rem" />}
                    text="Sing up with Github"
                />
                <SignInButton
                    variant="light"
                    icon={<FcGoogle size="1.7rem" />}
                    text="Sing up with Google"
                    iconBorder="#202122"
                />
            </Form>
        </Container>
    );
}
