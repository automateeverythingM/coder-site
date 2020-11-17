import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile/Profile";
import Notification from "react-notifications-component";
import "./App.css";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { connect, useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setCurrentUser } from "./store/reducers/userReducer";
import AuthRoute from "./components/PrivateRoute/AuthRoute";
import RedirectRoute from "./components/PrivateRoute/RedirectRoute";
const Login = React.lazy(() => import("./components/SingUpLoginForm/Login"));
const Signup = React.lazy(() => import("./components/SingUpLoginForm/Signup"));

function App({ isUserAuthenticated }) {
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            dispatch(setCurrentUser(user));
        });
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
