import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function AuthRoute({
    component: Component,
    isUserAuthenticated,
    redirectTo = "/login",
    restricted = false,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isUserAuthenticated && !restricted ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectTo} />
                )
            }
        ></Route>
    );
}

const user = ({ userReducer }) => {
    return {
        isUserAuthenticated: !!userReducer.currentUser,
    };
};

export default connect(user)(AuthRoute);
