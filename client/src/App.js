import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Character from "./components/Specs/Character";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
