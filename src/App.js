import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Pages/Home";
import { Signup, Login } from "./components/SingUpLoginForm";
function App() {
    return (
        <Router>
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
