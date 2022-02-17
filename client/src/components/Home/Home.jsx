import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../actions";
import Cards from "../Cards/Cards";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemon());
  }

  return (
    <div>
      <h1>POKEDEX</h1>

      <Cards allPokemons={allPokemons} />
    </div>
  );
}
