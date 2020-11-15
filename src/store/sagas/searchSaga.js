import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { setAutocompleteList } from "../reducers/searchReducer";

export function* loadAutoCompleteList() {
    yield takeLatest("FETCH_AUTOCOMPLETE_LIST", getAutoCompleteList);
}

function* getAutoCompleteList(action) {
    const {
        payload: { value },
    } = action;
    let finished = yield axios
        .get("https://api.npoint.io/b12a6e7e85e8e63d54a2")
        .then(({ data }) => {
            return data.filter((item) => {
                return item.name.toLowerCase().startsWith(value.toLowerCase());
            });
        });
    yield (finished = finished.slice(0, 10));

    yield put(setAutocompleteList(finished));
}
