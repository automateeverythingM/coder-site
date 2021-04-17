import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { FiMail } from "react-icons/fi";
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
import { Button, Spinner } from "react-bootstrap";
import { ReactComponent as loader } from "../src/img/loader.svg";
import RetrieveForgottenPassword from "./components/SingUpLoginForm/RetrieveForgottenPassword";
import SVG from "./components/UI/SVG/SVG";
import sleep from "./components/SingUpLoginForm/sleep";
const Login = React.lazy(() => import("./components/SingUpLoginForm/Login"));
const Signup = React.lazy(() => import("./components/SingUpLoginForm/Signup"));
const Profile = React.lazy(() => import("./components/Pages/Profile/Profile"));
const Home = React.lazy(() => import("./components/Pages/Home"));

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
            <Suspense fallback={<span>Loading...</span>}>
                <Notification />
            </Suspense>
            <header>
                <Navbar />
            </header>
            <main>
                <Suspense
                    fallback={
                        <div
                            style={{ height: "100vh" }}
                            className="w-100 d-flex align-items-center justify-content-center bg-dark"
                        >
                            <SVG
                                className="bg-dark"
                                svg={loader}
                                size="10rem"
                            />
                        </div>
                    }
                >
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
                        <Route
                            exact
                            path="/resetpassword"
                            component={RetrieveForgottenPassword}
                        />
                    </Switch>
                </Suspense>
                <Button
                    size="lg"
                    className="rounded-circle position-absolute"
                    variant="danger"
                >
                    <FiMail size="3rem" />
                </Button>
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
