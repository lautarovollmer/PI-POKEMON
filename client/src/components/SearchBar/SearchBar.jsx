import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../reducer/action";
import "../SearchBar/search.css";

export default function Search(setFilter) {
  const [input, setInput] = useState({ name: "" });
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePokemons(e.target.busqueda.value));
    setFilter(false);
  }

  function handleChange(e) {
    setInput({ ...input, name: e.target.value });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="busqueda"
          onChange={(e) => handleChange(e)}
          className="input"
        />
        <input
          className="btn"
          type="submit"
          value="Buscar"
          disabled={input.name !== "" ? false : true}
        />
      </form>
    </div>
  );
}
