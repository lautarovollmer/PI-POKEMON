import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Character from "./components/Specs/Character";
import Form from "./components/Form/form";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemons/:id" element={<Character />} />
        {<Route exact path="/create" element={<Form />} />}
      </Routes>
    </div>
  );
}

export default App;
