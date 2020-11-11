import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./styles.module.css";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit, watch, errors } = useForm();
  console.log(watch("username"));

  const onSubmit = (data) => {
    console.log("onSubmit -> data", data);
  };
  console.log("Signup -> errors", errors);
  return (
    <Container className={classes.singupContainer}>
      <h1>Create account</h1>
      <h4 className="text-muted">
        Fill all fields so people can find you easier
      </h4>
      <div className={classes.singupFormWrapper}>
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={`bg-dark text-white ${classes.singupForm}`}
        >
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              ref={register({ required: true })}
              type="text"
              placeholder="Enter username"
            />
            <Form.Text>Username must be unique</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              ref={register({ required: true })}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              ref={register({ required: true })}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              name="confirmPassword"
              ref={register({ required: true })}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>

          <Button block variant="danger" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}
