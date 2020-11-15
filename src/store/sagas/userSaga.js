import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../firebase";
import { setSignUpError } from "../reducers/fetchError";
import { SIGNUP_USER, LOG_OUT_USER, LOGIN } from "../reducers/userReducer";

export function* signupUserSaga() {
    yield takeEvery(SIGNUP_USER, signup);
}

export function* singOutUser() {
    yield takeEvery(LOG_OUT_USER, singOut);
}
export function* loginUser() {
    yield takeEvery(LOGIN, login);
}

function* login(action) {
    console.log("function*login -> action", action);
    console.log(action.payload.email);
    try {
        yield auth.signInWithEmailAndPassword(
            action.payload.email,
            action.payload.password
        );
    } catch (error) {
        yield put(setSignUpError(error));
    }
}
function* singOut() {
    yield auth.signOut();
}

function* signup(action) {
    const {
        payload: { email, password },
    } = action;

    try {
        yield auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        yield put(setSignUpError(error));
    }
}
