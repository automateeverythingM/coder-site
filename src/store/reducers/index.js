import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import errors from "./fetchError";
const rootReducer = combineReducers({
    searchReducer,
    userReducer,
    errors,
});

export default rootReducer;
