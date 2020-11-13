import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import searchReducer, {
    loadAutoCompleteList,
} from "./MainSearch/mainSearchReducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    searchReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(loadAutoCompleteList);

export default function WrapperProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
