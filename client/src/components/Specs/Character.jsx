import React, { useEffect } from "react";
import { getPokemonById, clearPokemonSpecs } from "../../reducer/action";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Character() {
  const pokemon = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => dispatch(clearPokemonSpecs());
  }, [dispatch]);

  let tipos = [];

  if (pokemon.Type) {
    tipos = pokemon.Type.map((tipo, i) => <h5 key={i}>{tipo}</h5>);
  } else if (pokemon.tipos) {
    tipos = pokemon.tipos.map((tipo) => <h5 key={tipo.id}>{tipo.name}</h5>);
  }

  return (
    <>
      <div>
        <Link to="/home">
          <span>Home</span>
        </Link>
      </div>
      <div>
        <img src={pokemon.img} alt="img pokemon" />
        <h1>{pokemon.name}</h1>
      </div>
      <div>
        <h3>Stats</h3>
      </div>
      <div>
        <span>{pokemon.vida}</span>
        <h5>Vida</h5>
      </div>
      <div>
        <span>{pokemon.fuerza}</span>
        <h5>Fuerza</h5>
      </div>
      <div>
        <span>{pokemon.defensa}</span>
        <h5>Defensa</h5>
      </div>
      <div>
        <span>{pokemon.velocidad}</span>
        <h5>Velocidad</h5>
      </div>
      <div>
        <h3>Dimensiones</h3>
      </div>
      <div>
        <span>{pokemon.altura}cm</span>
        <h5>Altura</h5>
      </div>
      <div>
        <span>{pokemon.peso}kg</span>
        <h5>Peso</h5>
      </div>
      <div>
        <h3>Tipos</h3>
        <div>{pokemon.Types}</div>
      </div>
    </>
  );
}
