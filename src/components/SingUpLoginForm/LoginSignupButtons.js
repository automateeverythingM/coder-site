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

export default function LoginSignup({ submitting, setSubmitting, isSignup }) {
    const dispatch = useDispatch();
    const singUpWithGithub = async () => {
        setSubmitting("github");
        dispatch(clearFetchError());
        await getUserWithProvider(githubProvider, dispatch, setFetchError);
        setSubmitting(false);
    };
    const { google, github } = isSignup
        ? { google: "Sign up with Google", github: "Sign up with Github" }
        : { google: "Login with Google", github: "Login with Github" };
    const signupWithGoogle = async () => {
        setSubmitting("google");
        dispatch(clearFetchError());
        await getUserWithProvider(googleProvider, dispatch, setFetchError);
        setSubmitting(false);
    };
    return (
        <div className="mt-4">
            <ButtonWithIcon
                className="mt-3"
                background="teal"
                disabled={!!submitting}
                loading={!!(submitting === "register")}
                onlySpinner
                block
                icon={FaGlobe}
                type="submit"
            >
                Register
            </ButtonWithIcon>
            <ButtonWithIcon
                className="mt-3"
                background="#24292E"
                disabled={!!submitting}
                loading={!!(submitting === "github")}
                onlySpinner
                block
                icon={ImGithub}
                onClick={singUpWithGithub}
            >
                {github}
            </ButtonWithIcon>
            <ButtonWithIcon
                className="mt-3"
                disabled={!!submitting}
                loading={!!(submitting === "google")}
                onlySpinner
                block
                icon={AiOutlineGoogle}
                onClick={signupWithGoogle}
            >
                {google}
            </ButtonWithIcon>
        </div>
    );
}
