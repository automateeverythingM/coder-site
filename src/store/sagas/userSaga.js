import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../firebase";
import { setSignUpError } from "../reducers/fetchError";
import { SIGNUP_USER } from "../reducers/userReducer";

export function* signupUserSaga() {
    yield takeEvery(SIGNUP_USER, signup);
}

function* signup(action) {
    const {
        payload: { email, password },
    } = action;

    try {
        yield auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        console.log("function*signup -> error", error);
        yield put(setSignUpError(error));
    }
}
