import produce from "immer";

const FETCH_ERROR = "FETCH_ERROR";
const CLEAR_FETCH_ERROR = "CLEAR_FETCH_ERROR";
export function setFetchError(error) {
    return { type: FETCH_ERROR, payload: { error } };
}
export function clearFetchError() {
    return { type: CLEAR_FETCH_ERROR };
}
const initialState = {
    serverFetchError: null,
};

export default function reducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case FETCH_ERROR:
                draft.serverFetchError = action.payload.error;
                break;
            case CLEAR_FETCH_ERROR:
                draft.serverFetchError = null;
                break;
            default:
                break;
        }
    });
}
