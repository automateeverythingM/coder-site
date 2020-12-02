import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import errors from "./fetchError";
import projectReducer from "./projectReducer";
const rootReducer = combineReducers({
    searchReducer,
    userReducer,
    errors,
    projectReducer,
});

export default rootReducer;
