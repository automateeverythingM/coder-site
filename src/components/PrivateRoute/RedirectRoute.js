import React from "react";
import { Redirect, Route } from "react-router";

export default function RedirectRoute({
    component: Component,
    redirectTo = "/",
    restrictCondition = true,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                restrictCondition ? (
                    <Redirect to={redirectTo} />
                ) : (
                    <Component {...props} />
                )
            }
        ></Route>
    );
}
