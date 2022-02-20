import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../reducer/action";
import Card from "../PokemonCard/Card";

export default function Detail() {
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  return (
    <>
      <div>
        <Link to="/home">Back</Link>
      </div>
      <div>
        <h5>id: {pokemonDetail.id}</h5>
        <h1>Name: {pokemonDetail.name}</h1>
        {/* <img src={pokemonDetail.image} alt="no image" style={{ width: 300 }} /> */}
        <h3>Attack: {pokemonDetail.attach}</h3>
        <hr />
        <Card allPokemons={pokemonDetail} />
      </div>
    </>
  );
}
