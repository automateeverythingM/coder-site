import React from "react";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import classes from "./styles.module.css";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit, watch, errors, getValues } = useForm();

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
            <InputGroup>
              <Form.Control
                className="border-right-0"
                name="username"
                ref={register({
                  required: "Username is required",
                  minLength: { value: 5, message: "Minimum length is 5" },
                })}
                type="text"
                placeholder="Enter username"
                isInvalid={errors.username}
              />
              <InputGroup.Append>
                <div className="d-flex align-items-center bg-white rounded-right">
                  <Spinner
                    className="mr-2"
                    animation="border"
                    role="status"
                    size="sm"
                    variant="dark"
                  />
                </div>
              </InputGroup.Append>
            </InputGroup>

            <Form.Text>Username must be unique</Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.username && errors.username.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              ref={register({ required: "Email is required" })}
              type="email"
              placeholder="Enter email"
              isInvalid={errors.email && errors.email.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              ref={register({
                required: "Password is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                  message: "Password must contains capital letter and number",
                },
              })}
              type="password"
              placeholder="Password"
              isInvalid={errors.password && errors.password.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              name="confirmPassword"
              ref={register({
                required: "Please confirm password",
                validate: (value) => {
                  return (
                    value === getValues().password ||
                    "Confirm password don`t match"
                  );
                },
              })}
              type="password"
              placeholder="Confirm password"
              isInvalid={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword && errors.confirmPassword.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button block variant="danger" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}
