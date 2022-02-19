import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../reducer/action";
import Cards from "../Cards/Cards";
import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemon());
  }

  if (state.allPokemons < 1) {
    return <Loading />;
  } else {
    return (
      <div>
        <h1>POKEDEX</h1>

        <Cards allPokemons={allPokemons} />
      </div>
    );
  }
}
