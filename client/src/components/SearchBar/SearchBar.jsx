import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../reducer/action";
import "../SearchBar/search.css";

export default function Search() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (event) => {
    setState(event.target.value);
  };

  const onClickHandler = () => {
    dispatch(getNamePokemons(state));
  };

  return (
    <div>
      <input
        className="input"
        required
        autoComplete="off"
        type="text"
        placeholder="Pokemon..."
        name="input"
        onChange={(e) => inputHandler(e)}
      />
      <button className="btn" onClick={(e) => onClickHandler(e)}>
        Search
      </button>
    </div>
  );
}
