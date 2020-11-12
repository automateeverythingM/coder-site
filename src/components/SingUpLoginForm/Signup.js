import React, { useState } from "react";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import classes from "./styles.module.css";
import { useForm } from "react-hook-form";
import { HiCheckCircle } from "react-icons/hi";

export default function Signup() {
  const { register, handleSubmit, setError, errors, getValues } = useForm({});
  const [asyncCallInProgress, setAsyncCallInProgress] = useState(false);
  const [asyncCallPass, setAsyncCallPass] = useState(false);
  const namesArray = ["marko", "nikola", "relja", "dusan", "djordje"];
  const onSubmit = (data) => {
    console.log("onSubmit -> data", data);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const uniqueUsernameCheck = async (e) => {
    const name = e.target.value;
    setAsyncCallPass(false);
    if (name.length < 5) return;
    setAsyncCallInProgress(true);
    const isUserUnique = !namesArray.includes(name);
    await sleep(2000);
    setAsyncCallInProgress(false);
    setAsyncCallPass(isUserUnique);
    if (!isUserUnique)
      setError("username", {
        type: "manual",
        message: "Username is already taken",
      });
  };

  console.log("Signup -> errors", errors);
  console.log("Signup -> errors.username", errors?.username?.message);
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
            <InputGroup>
              <Form.Control
                className="border-right-0 shadow-none border-0"
                name="username"
                ref={register({
                  required: "Username is required",
                  minLength: { value: 5, message: "Minimum length is 5" },
                  validate: async (value) => {
                    setAsyncCallInProgress(true);
                    await sleep(2000);
                    const isUserUnique = namesArray.includes(value);
                    setAsyncCallInProgress(false);
                    setAsyncCallPass(isUserUnique);
                    return isUserUnique || "Username is already taken";
                  },
                })}
                type="text"
                placeholder="Enter username"
                onChange={uniqueUsernameCheck}
                isInvalid={errors.username && !asyncCallInProgress}
              />
              {(asyncCallInProgress || asyncCallPass) && (
                <InputGroup.Append className="d-flex align-items-center bg-white rounded-right px-2">
                  {asyncCallPass ? (
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

          <Button block variant="danger" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}
