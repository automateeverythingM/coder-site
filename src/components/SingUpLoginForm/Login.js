import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import SignInButton from "../UI/SingInButton";
export default function Login() {
  return (
    <Container>
      <h1>Login</h1>
      <Form noValidate>
        <Form.Group>
          <Form.Label>Username or email</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control />
        </Form.Group>

        <Button block variant="danger">
          Login
        </Button>
        <SignInButton
          icon={<ImGithub size="2em" />}
          text="Sing up with Github"
        />

        <SignInButton
          variant="light"
          icon={<FcGoogle size="2em" />}
          text="Sing up with Google"
          iconBorder="#202122"
        />
      </Form>
    </Container>
  );
}
