import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../../reducer/action";

export default function Search() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const inputHandler = (event) => {
    setState(event.target.value);
  };

  const onClickHandler = () => {
    dispatch(getPokemon(state));
  };

  return (
    <div>
      <div>
        <input
          required
          autoComplete="off"
          type="text"
          placeholder="Search by name"
          name="input"
          onChange={(e) => inputHandler(e)}
        />
        <button onClick={onClickHandler}>Buscar</button>
      </div>
    </div>
  );
}
