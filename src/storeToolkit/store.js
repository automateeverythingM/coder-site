import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { loadAutoCompleteList } from "../reducers/searchReducer";
import rootReducer from "../reducers";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(loadAutoCompleteList);
export default function WrapperProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
