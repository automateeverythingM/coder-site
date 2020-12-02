/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { setFetchError } from "../../store/reducers/fetchError";
import { loginUser, setCurrentUser } from "../../store/reducers/userReducer";
import LoginSignupButtons from "./LoginSignupButtons";
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

function Login({ serverFetchError, isUserAuthenticated, dispatch }) {
    const { register, handleSubmit, errors } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const history = useHistory();

    const onSubmit = async (data) => {
        const { email, password } = data;
        setSubmitting("register");
        sleep(5000);
        const user = await auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                dispatch(setFetchError(error));
            });

        setCurrentUser(user);

        setSubmitting(false);
        if (user) history.push("/");
    };

    return (
        <Container css={container}>
            <h1>Login</h1>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                css={form}
                className="bg-dark text-white"
            >
                <Form.Group>
                    <Form.Label>Username or email</Form.Label>
                    <Form.Control
                        name="email"
                        ref={register({
                            required: "Please enter a valid email",
                        })}
                        placeholder="Enter username or email"
                        isInvalid={errors.email && errors.email.message}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email && errors.email.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={register({
                            required: "Please enter your password",
                        })}
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        isInvalid={errors.password && errors.password.message}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password && errors.password.message}
                    </Form.Control.Feedback>
                </Form.Group>
                {serverFetchError && (
                    <Alert className="text-center" variant="danger">
                        {serverFetchError.message}
                    </Alert>
                )}

                <LoginSignupButtons
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                />

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

const mapStateToProps = (state) => {
    return {
        serverFetchError: state.errors.serverFetchError,
        isUserAuthenticated: !!state.userReducer.currentUser,
    };
};

export default connect(mapStateToProps)(Login);
