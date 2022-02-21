import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Specs from "./components/Specs/Specs";
import Search from "./components/SearchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<Specs />} />
        <Route exact path="/home/pokemon/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
