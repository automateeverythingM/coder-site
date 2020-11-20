import React, { useState } from "react";
import { Alert, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import classes from "./styles.module.css";
import { useForm } from "react-hook-form";
import { HiCheckCircle } from "react-icons/hi";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import sleep from "./sleep";
import {
    setCurrentUser,
    signupUserINREDUCER,
} from "../../store/reducers/userReducer";
import SignInButton from "../UI/Buttons/SingInButton";
import ButtonWithLoadingDisable from "../UI/Buttons/ButtonWithLoadingDisable";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { auth, githubProvider, googleProvider } from "../../firebase";
import { setFetchError } from "../../store/reducers/fetchError";
import getUserWithProvider from "./authProvider";
import md5 from "md5";
import ButtonWithIcon, {
    MSpinner,
} from "../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";

function Signup({
    signupNewUser,
    serverFetchError,
    isUserCreated,
    isUserAuthenticated,
}) {
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

    const asyncCheckIn = asyncCallInProgress || usernameValidatePass;
    const checkAsync = asyncCheckIn ? "rounded-right-0" : "rounded-right";
    const onSubmit = async (data) => {
        setSubmitting("register");
        const { email, password, username } = data;
        const user = await auth
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                dispatch(setFetchError(error));
            });
        await user.user.updateProfile({
            photoURL: `http://gravatar.com/avatar/${md5(email)}`,
            displayName: username,
        });
        //!redux saga
        // signupNewUser(data);

        //
        setCurrentUser(user);
        setSubmitting(false);
        if (user) history.push("/");
    };

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

    const singUpWithGithub = async () => {
        setSubmitting("github");
        await getUserWithProvider(githubProvider, dispatch, setFetchError);
        setSubmitting(false);
    };

    const signupWithGoogle = async () => {
        setSubmitting("google");
        await getUserWithProvider(googleProvider, dispatch, setFetchError);
        setSubmitting(false);
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
                                isInvalid={
                                    errors.username && !asyncCallInProgress
                                }
                            />
                            {asyncCheckIn && (
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
                            isInvalid={
                                errors.password && errors.password.message
                            }
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
                    <div className="mt-4">
                        <ButtonWithLoadingDisable
                            disabled={submitting}
                            loading={submitting === "register"}
                            block
                            variant="danger"
                            type="submit"
                            AsSpinner={Spinner}
                            spinnerProps={{
                                animation: "border",
                                variant: "white",
                                size: "sm",
                            }}
                            onlySpinner
                        >
                            Register
                        </ButtonWithLoadingDisable>
                        <SignInButton
                            variant="dark"
                            disabled={submitting}
                            loading={submitting === "github"}
                            icon={
                                <ImGithub
                                    color="whitesmoke"
                                    size="1.7rem"
                                    className="h-100"
                                />
                            }
                            spinnerProps={{
                                animation: "border",
                                variant: "light",
                                size: "sm",
                            }}
                            onClick={singUpWithGithub}
                            text="Sing up with Github"
                            iconBorder="whitesmoke"
                        />
                        <SignInButton
                            variant="danger"
                            disabled={submitting}
                            loading={submitting === "google"}
                            icon={<FcGoogle size="1.7rem" />}
                            text="Sing up with Google"
                            iconBorder="#202122"
                            onClick={signupWithGoogle}
                            spinnerProps={{
                                animation: "border",
                                variant: "dark",
                                size: "sm",
                            }}
                        />
                    </div>
                    <ButtonWithIcon background="#1A1B1C" loading onlySpinner>
                        Registererere
                    </ButtonWithIcon>
                    <MSpinner size="3em" />
                    <div className="text-center mt-2">
                        Already have an account?{" "}
                        <b>
                            <Link className="text-warning" to="/login">
                                Login
                            </Link>
                        </b>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

const mapStateToProps = ({ errors, userReducer }) => {
    return {
        serverFetchError: errors.serverFetchError,
        isUserCreated: userReducer.currentUser,
        isUserAuthenticated: !!userReducer.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signupNewUser: (value) => dispatch(signupUserINREDUCER(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
