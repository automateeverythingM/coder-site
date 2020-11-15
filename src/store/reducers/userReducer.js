import produce from "immer";

//! ******************************
const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SIGNUP_USER = "SIGNUP_USER";

const initialState = {
    currentUser: null,
};

//! ***********************

//! ****************

export function setCurrentUser(user) {
    return { type: SET_CURRENT_USER, payload: { user } };
}

export function signupUserINREDUCER(user) {
    return { type: SIGNUP_USER, payload: user };
}

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;
    return produce(state, (draft) => {
        switch (type) {
            case SET_CURRENT_USER:
                draft.currentUser = payload.user;
                break;
            default:
                break;
        }
    });
}
