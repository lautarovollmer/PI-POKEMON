import React, { useEffect } from "react";
import { getPokemonById } from "../../reducer/action";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

export default function Character() {
  const pokemon = useSelector((store) => store.pokemon);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch]);

  console.log(pokemon, "POKEMON");
  return (
    <div>
      <img src={pokemon.image} alt="image not found" />
      <h2>{pokemon.name}</h2>
      <p>
        <span>ID: </span>
        {pokemon.id}
      </p>
      <p>
        <span>Health: </span>
        {pokemon.hp}
      </p>
      <p>
        <span>Attack: </span>
        {pokemon.attack}
      </p>
      <p>
        <span>Defense: </span>
        {pokemon.defense}
      </p>
      <p>
        <span>Speed: </span>
        {pokemon.speed}
      </p>
      <p>
        <span>Height: </span>
        {pokemon.height}
      </p>
      <p>
        <span>Weight: </span>
        {pokemon.weight}
      </p>
    </div>
  );
}
