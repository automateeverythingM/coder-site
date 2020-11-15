import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signup, Login } from "./components/SingUpLoginForm";
import Navbar from "./components/NavBar";
import Home from "./components/Pages/Home";
import Notification from "react-notifications-component";
import "./App.css";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setCurrentUser } from "./store/reducers/userReducer";

function App() {
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
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </main>
        </Router>
    );
}

export default App;
