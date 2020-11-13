import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Pages/Home";
import { Signup, Login } from "./components/SingUpLoginForm";
import Notification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
    return (
        <Router>
            <Notification />
            <header>
                <Navbar />
            </header>
            <main>
                <Switch>
                    <Home exact path="/" />
                    <Signup exact path="/signup" />
                    <Login exact path="/login" />
                </Switch>
            </main>
        </Router>
    );
}

export default App;
