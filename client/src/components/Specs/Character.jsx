import React, { useEffect } from "react";
import { getPokemonById } from "../../reducer/action";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Character() {
  const pokemon = useSelector(
    (store) => store.pokemon.length && store.pokemon[0]
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, []);
  console.log(pokemon, " POKEMONS");
  return (
    <>
      {pokemon.hasOwnProperty("name") ? (
        <>
          <div>
            <Link to="/home">
              <span>Home</span>
            </Link>
          </div>
          <div>
            <img src={pokemon.image} alt="img pokemon" />
            <h1>{pokemon.name}</h1>
          </div>
          <div>
            <h3>Stats</h3>
          </div>
          <div>
            <span>{pokemon.hp}</span>
            <h5>Vida</h5>
          </div>
          <div>
            <span>{pokemon.attack}</span>
            <h5>Fuerza</h5>
          </div>
          <div>
            <span>{pokemon.defense}</span>
            <h5>Defensa</h5>
          </div>
          <div>
            <span>{pokemon.speed}</span>
            <h5>Velocidad</h5>
          </div>
          <div>
            <h3>Dimensiones</h3>
          </div>
          <div>
            <span>{pokemon.height}cm</span>
            <h5>Altura</h5>
          </div>
          <div>
            <span>{pokemon.weight}kg</span>
            <h5>Peso</h5>
          </div>
          <div>
            <h3>Tipos</h3>
            <div>
              {pokemon.Type.length
                ? pokemon.Type.map((t) => t.name)
                : "Este pokemon no tiene tipo"}
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
