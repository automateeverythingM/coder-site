import { all } from "redux-saga/effects";
import { loadAutoCompleteList } from "./searchSaga";
import { signupUserSaga } from "./userSaga";

export default function* rootSagas() {
    yield all([loadAutoCompleteList(), signupUserSaga()]);
}
