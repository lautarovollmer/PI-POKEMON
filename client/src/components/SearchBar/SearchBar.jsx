import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemonSearch, getNamePokemons } from "../../reducer/action";
import Character from "../Specs/Character";
// import { useHistory } from "react-router-dom";

export default function Search() {
  //   let history = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const pokemonSearch = useSelector((store) => store.pokemonSearch);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length) {
      setLoading(true);
      dispatch(getNamePokemons(name.toLowerCase()));
      setName("");
      //   history.push("/home/pokemon/search");
      //   //setLoading(false)
    } else {
      alert("Please type a name");
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearPokemonSearch());
    };
  }, [dispatch]);

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Search a pokemon"
            value={name}
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" value="Search" />
        </form>
        <div>
          {pokemonSearch.id ? (
            <Character pokemon={pokemonSearch} />
          ) : pokemonSearch.message ? (
            <div>
              <h2>404 Not found: That Pokemon does not exists, yet</h2>
            </div>
          ) : !loading ? null : (
            <span>loading...</span>
          )}
        </div>
      </div>
    </>
  );
}
