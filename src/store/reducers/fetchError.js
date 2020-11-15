import produce from "immer";

const SIGNUP_ERRORS = "SIGNUP_ERRORS";

export function setSignUpError(error) {
    return { type: SIGNUP_ERRORS, payload: { error } };
}

const initialState = {
    signupError: [],
};

export default function reducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SIGNUP_ERRORS:
                draft.signupError.push(action.payload.error);
                break;

            default:
                break;
        }
    });
}
