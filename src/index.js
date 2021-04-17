import React from "react";
import ReactDOM from "react-dom";
import StoreProvider from "./store/configStore";
import "./index.css";
import App from "./App";
import "./custom.scss";

// import "semantic-ui-css/semantic.min.css";
ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById("root")
);
