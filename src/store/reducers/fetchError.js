import produce from "immer";

const FETCH_ERROR = "FETCH_ERROR";

export function setFetchError(error) {
    return { type: FETCH_ERROR, payload: { error } };
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

            default:
                break;
        }
    });
}
