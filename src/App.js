import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile/Profile";
import Notification from "react-notifications-component";
import "./App.css";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { connect } from "react-redux";
import { auth, database } from "./firebase";
import {
    setCurrentUser,
    setUserProfileData,
} from "./store/reducers/userReducer";
import AuthRoute from "./components/PrivateRoute/AuthRoute";
import RedirectRoute from "./components/PrivateRoute/RedirectRoute";
const Login = React.lazy(() => import("./components/SingUpLoginForm/Login"));
const Signup = React.lazy(() => import("./components/SingUpLoginForm/Signup"));

function App({ isUserAuthenticated, dispatch }) {
    const addListener = async () => {
        try {
            auth.onAuthStateChanged(async (user) => {
                dispatch(setCurrentUser(user));
                if (user) {
                    await database
                        .ref("users")
                        .child(user.uid)
                        .on("value", (snap) => {
                            dispatch(setUserProfileData(snap.val()));
                        });
                } else {
                    dispatch(setUserProfileData(null));
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        addListener();
    }, []);

    return (
        <Router>
            <Notification />
            <header>
                <Navbar />
            </header>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <RedirectRoute
                            exact
                            path="/signup"
                            redirectTo="/"
                            restrictCondition={isUserAuthenticated}
                            component={Signup}
                        />
                        <RedirectRoute
                            exact
                            path="/login"
                            restrictCondition={isUserAuthenticated}
                            redirectTo="/"
                            component={Login}
                        />
                        <AuthRoute exact path="/profile" component={Profile} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Suspense>
            </main>
        </Router>
    );
}

const state = ({ userReducer }) => {
    return {
        isUserAuthenticated: !!userReducer.currentUser,
    };
};

export default connect(state)(App);
