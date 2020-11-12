import React, { useState } from "react";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import classes from "./styles.module.css";
import { useForm } from "react-hook-form";
import { HiCheckCircle } from "react-icons/hi";

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    getValues,
  } = useForm({});
  const [asyncCallInProgress, setAsyncCallInProgress] = useState(false);
  const [usernameValidatePass, setUsernameValidatePass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const namesArray = ["marko", "nikola", "relja", "dusan", "djordje"];
  const onSubmit = async (data) => {
    setSubmitting(true);
    await sleep(1000);
    setSubmitting(false);
    console.log("onSubmit -> data", data);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const uniqueUsernameCheck = async (name) => {
    setUsernameValidatePass(false);

    clearErrors(["username"]);
    if (name.length < 5) return;
    setAsyncCallInProgress(true);
    const isUserUnique = !namesArray.includes(name);
    await sleep(2000);
    setAsyncCallInProgress(false);
    setUsernameValidatePass(isUserUnique);
    if (!isUserUnique)
      setError("username", {
        type: "manual",
        message: "Username is already taken",
      });

    return isUserUnique;
  };

  return (
    <Container className={classes.signupContainer}>
      <h1>Create account</h1>
      <h4 className="text-muted">
        Fill all fields so people can find you easier
      </h4>
      <div className={classes.signupFormWrapper}>
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={`bg-dark text-white ${classes.signupForm}`}
        >
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <InputGroup className="rounded-right overflow-hidden">
              <Form.Control
                className="border-right-0 shadow-none border-0 rounded-right"
                name="username"
                ref={register({
                  required: "Username is required",
                  minLength: { value: 5, message: "Minimum length is 5" },
                  validate: async (value) => {
                    return usernameValidatePass || "Username is already taken";
                  },
                })}
                type="text"
                placeholder="Enter username"
                onChange={(e) => uniqueUsernameCheck(e.target.value)}
                isInvalid={errors.username && !asyncCallInProgress}
              />
              {(asyncCallInProgress || usernameValidatePass) && (
                <InputGroup.Append className="d-flex align-items-center bg-white rounded-right px-2">
                  {usernameValidatePass ? (
                    <HiCheckCircle color="green" />
                  ) : (
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      variant="dark"
                    />
                  )}
                </InputGroup.Append>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.username && errors.username.message}
              </Form.Control.Feedback>
            </InputGroup>

            {/* <Form.Text>Username must be unique</Form.Text> */}
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

          <Button disabled={submitting} block variant="danger" type="submit">
            {submitting ? (
              <Spinner animation="border" variant="white" />
            ) : (
              "Register"
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
}
