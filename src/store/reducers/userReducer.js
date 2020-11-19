import produce from "immer";
import { firestore } from "../../firebase";

//! ******************************
const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
const IS_LOGGED_IN = "IS_LOGGED_IN";
export const LOGIN = "LOGIN";
export const SET_GITHUB_CREDENTIALS = "SET_GITHUB_CREDENTIALS";

const initialState = {
    currentUser: null,
    userDb: null,
    githubCredentialsToken: null,
    googleCredentials: null,
    isUserSignIn: false,
};

//! ***********************

//! ****************

export function setCurrentUser(user) {
    return { type: SET_CURRENT_USER, payload: { user } };
}

export function loginUser(email, password) {
    return { type: LOGIN, payload: { email, password } };
}

export function singOutUser() {
    return { type: LOG_OUT_USER, payload: {} };
}
export function setGithubCredentials(credentials) {
    return { type: SET_GITHUB_CREDENTIALS, payload: { credentials } };
}

export function signupUserINREDUCER(user) {
    return { type: SIGNUP_USER, payload: user };
}

export function isLoggedIn() {
    return { type: IS_LOGGED_IN };
}

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;
    return produce(state, (draft) => {
        switch (type) {
            case SET_CURRENT_USER:
                draft.currentUser = payload.user;
                break;
            case SET_GITHUB_CREDENTIALS:
                draft.githubCredentialsToken = payload.credentials;
                break;
            default:
                break;
        }
    });
}
