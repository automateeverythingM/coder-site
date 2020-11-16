import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function PrivateRoute({
    component: Component,
    isUserAuthenticated,
    restricted,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isUserAuthenticated && restricted ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
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

export default connect(user)(PrivateRoute);
