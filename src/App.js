import { Container } from "react-bootstrap";
import "./App.css";
import Navbar from "./components/NavBar";
import HeroSearch from "./components/Hero/HeroSearch";
import HeroRejected from "./components/Hero/HeroRejected";
import HeroPractice from "./components/Hero/HeroPractice";

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSearch />

        <HeroRejected />

        <HeroPractice />
      </main>
    </div>
  );
}

export default App;
