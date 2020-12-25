import React, { useState } from "react";
import { Alert, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

/** @jsxRuntime classic */
/** @jsx jsx */
import sleep from "./sleep";
import {
    setCurrentUser,
    signupUserINREDUCER,
} from "../../store/reducers/userReducer";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { auth, database } from "../../firebase";
import {
    clearFetchError,
    setFetchError,
} from "../../store/reducers/fetchError";
import md5 from "md5";
import LoginSignup from "./LoginSignupButtons";
import { css, jsx } from "@emotion/react";
import { debounce } from "loadsh";

function Signup({ serverFetchError }) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        errors,
        getValues,
    } = useForm({});
    const dispatch = useDispatch();
    const history = useHistory();
    //
    const [asyncCallInProgress, setAsyncCallInProgress] = useState(false);
    const [usernameValidatePass, setUsernameValidatePass] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const namesArray = ["marko", "nikola", "relja", "dusan", "djordje"];

    const checkAsync = asyncCallInProgress
        ? "rounded-right-0"
        : "rounded-right";
    const onSubmit = async (data) => {
        setSubmitting("register");
        dispatch(clearFetchError());
        const { email, password, username } = data;

        try {
            const userRef = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await updateUser(userRef, username, email);
            await saveUser(userRef.user, userRef.additionalUserInfo.providerId);
            setCurrentUser(userRef.user);
            setSubmitting(false);
            if (userRef) history.push("/");
        } catch (error) {
            dispatch(setFetchError(error));
            setSubmitting(false);
        }
    };

    const updateUser = (userRef, username, email) => {
        const url = `http://www.gravatar.com/avatar/${md5(email)}?d=identicon`;
        return userRef.user.updateProfile({
            photoURL: url,
            displayName: username,
        });
    };

    const saveUser = (user, provider) => {
        return database.ref("users").child(user.uid).set({
            name: user.displayName,
            avatar_url: user.photoURL,
            email: user.email,
            provider,
        });
    };

    const uniqueUsernameCheck = debounce(async (name) => {
        clearErrors("username");
        setUsernameValidatePass(false);

        if (name.length < 5) return;
        setAsyncCallInProgress(true);
        const isUserUnique = !namesArray.includes(name);

        await sleep(1000);
        setAsyncCallInProgress(false);
        setUsernameValidatePass(isUserUnique);
        if (!isUserUnique)
            setError("username", {
                type: "manual",
                message: "Username is already taken",
            });

        return isUserUnique;
    }, 300);

    return (
        <Container
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 5em;
            `}
        >
            <h1>Create account</h1>
            <h4 className="text-muted">
                Fill all fields so people can find you easier
            </h4>

            <Form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className={`bg-dark text-white`}
                css={css`
                    padding: 2em;
                    border-radius: 0.5em;
                    max-width: 600px;
                    width: 40em;
                `}
            >
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <InputGroup className="rounded-right overflow-hidden">
                        <Form.Control
                            className={`border-right-0 shadow-none border-0 ${checkAsync}`}
                            name="username"
                            ref={register({
                                required: "Username is required",
                                minLength: {
                                    value: 5,
                                    message: "Minimum length is 5",
                                },
                                validate: async (value) => {
                                    return (
                                        usernameValidatePass ||
                                        "Username is already taken"
                                    );
                                },
                            })}
                            type="text"
                            placeholder="Enter username"
                            onChange={(e) =>
                                uniqueUsernameCheck(e.target.value)
                            }
                            isInvalid={!asyncCallInProgress && errors.username}
                            isValid={usernameValidatePass}
                            autoComplete="off"
                        />
                        {asyncCallInProgress && (
                            <InputGroup.Append className="d-flex align-items-center bg-white rounded-right px-2">
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
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        ref={register({
                            required: "Email is required",
                            pattern: {
                                value: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
                                message: "Please enter a valid email",
                            },
                        })}
                        type="email"
                        placeholder="Enter email"
                        isInvalid={errors.email && errors.email.message}
                        autoComplete="off"
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
                                message:
                                    "Password must contains capital letter and number",
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
                            errors.confirmPassword &&
                            errors.confirmPassword.message
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword &&
                            errors.confirmPassword.message}
                    </Form.Control.Feedback>
                </Form.Group>
                {serverFetchError && (
                    <Alert className="text-center" variant="danger">
                        {serverFetchError.message}
                    </Alert>
                )}
                <LoginSignup
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                    isSignup
                />

                <div className="text-center mt-2">
                    Already have an account?{" "}
                    <b>
                        <Link className="text-warning" to="/login">
                            Login
                        </Link>
                    </b>
                </div>
            </Form>
        </Container>
    );
}

const mapStateToProps = ({ errors, userReducer }) => {
    return {
        serverFetchError: errors.serverFetchError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signupNewUser: (value) => dispatch(signupUserINREDUCER(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
