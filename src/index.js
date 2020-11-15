import React from "react";
import ReactDOM from "react-dom";
import StoreProvider from "./store/configStore";
import "./index.css";
import App from "./App";
import "./custom.scss";
import { auth } from "./firebase";

// import "semantic-ui-css/semantic.min.css";
ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
