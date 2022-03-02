import React, { useEffect } from "react";
import { getPokemonById, cleanDetailsPokemon } from "../../reducer/action";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../Specs/character.css";

export default function Character() {
  const pokemon = useSelector(
    (store) => store.pokemon.length && store.pokemon[0]
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, []);

  useEffect(() => {
    return () => dispatch(cleanDetailsPokemon());
  }, [dispatch]);

  return (
    <div>
      <div className="style">
        {pokemon.hasOwnProperty("name") ? (
          <>
            <div className="cardConteiner" />
            <div className="homeC">
              <Link className="link-s" to="/home">
                <span>Home</span>
              </Link>
            </div>
            <div className="imgT">
              <img
                className="style-img"
                src={
                  pokemon.image
                    ? pokemon.image
                    : "https://www.animatedimages.org/data/media/1446/animated-pokemon-image-0095.gif"
                }
                alt="img pokemon"
              />
              <h1>{pokemon.name}</h1>
            </div>
            <div className="stats">
              <h3>Stats</h3>

              <span className="span">Id:</span>
              <span>{pokemon.id}</span>

              <span className="span">Life:</span>
              <span>{pokemon.hp}</span>

              <span className="span">Attack:</span>
              <span>{pokemon.attack}</span>

              <span className="span">Defense:</span>
              <span>{pokemon.defense}</span>

              <span className="span">Speed:</span>
              <span>{pokemon.speed}</span>
            </div>
            <div className="stats">
              <h3>Size</h3>

              <span className="span-dim">Height:</span>
              <span>{pokemon.height}</span>

              <span className="span-dim">Weight:</span>
              <span>{pokemon.weight}</span>

              <div>
                <h3>Types</h3>
                <div>
                  {pokemon.Type.length
                    ? pokemon.Type.map((t) => (
                        <span className="types" key={t.name}>
                          {t.name}
                        </span>
                      ))
                    : "Este pokemon no tiene tipo"}
                </div>
              </div>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
