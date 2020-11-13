import React from "react";
import { Container, Form } from "react-bootstrap";

export default function Login() {
  return (
    <Container>
      <h1>Login</h1>;
      <Form noValidate>
        <Form.Group>
          <Form.Label>Username or email</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form>
    </Container>
  );
}
