import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, clearPokemonSpecs } from "../../reducer/action";
import Character from "./Character";

export default function Specs(props) {
  const dispatch = useDispatch();
  const pokemonsSpecs = useSelector((store) => store.pokemonsSpecs);

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
    return () => {
      dispatch(clearPokemonSpecs());
    };
  }, [dispatch]);

  return (
    <div>
      <Character pokemon={pokemonsSpecs} />
    </div>
  );
}
