import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { loadAutoCompleteList } from "./reducers/searchReducer";
import { signupUserSaga } from "./reducers/userReducer";
import rootSagas from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSagas);

export default function WrapperProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
