import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../reducer/action";
import "../SearchBar/search.css";

export default function Search() {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(getNamePokemons(input));
  };

  return (
    <div>
      <div>
        <input
          placeholder="Search your Pokemon..."
          type="text"
          name="input"
          required
          autoComplete="off"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={onClickHandler}>Search</button>
      </div>
    </div>
  );
}
