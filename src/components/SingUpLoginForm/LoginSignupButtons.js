import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { useDispatch } from "react-redux";
import { githubProvider, googleProvider } from "../../firebase";
import {
    clearFetchError,
    setFetchError,
} from "../../store/reducers/fetchError";
import ButtonWithIcon from "../UI/Buttons/ButtonWithIconAndLoader/ButtonWithIcon";
import getUserWithProvider from "./authProvider";

export default function LoginSignup({ submitting, setSubmitting }) {
    const dispatch = useDispatch();
    const singUpWithGithub = async () => {
        setSubmitting("github");
        dispatch(clearFetchError());
        await getUserWithProvider(githubProvider, dispatch, setFetchError);
        setSubmitting(false);
    };

    const signupWithGoogle = async () => {
        setSubmitting("google");
        dispatch(setFetchError());
        await getUserWithProvider(googleProvider, dispatch, setFetchError);
        setSubmitting(false);
    };
    return (
        <div className="mt-4">
            <ButtonWithIcon
                background="teal"
                disabled={submitting}
                loading={submitting === "register"}
                onlySpinner
                block
                icon={FaGlobe}
                type="submit"
            >
                Register
            </ButtonWithIcon>
            <ButtonWithIcon
                background="#24292E"
                disabled={submitting}
                loading={submitting === "github"}
                onlySpinner
                block
                icon={ImGithub}
                onClick={singUpWithGithub}
            >
                Sign in with Github
            </ButtonWithIcon>
            <ButtonWithIcon
                disabled={submitting}
                loading={submitting === "google"}
                onlySpinner
                block
                icon={AiOutlineGoogle}
                onClick={signupWithGoogle}
            >
                Sign in with Google
            </ButtonWithIcon>
        </div>
    );
}
