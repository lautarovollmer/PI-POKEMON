import React from "react";
import { Link } from "react-router-dom";
import "../PokemonCard/card.css";

export default function Card({ name, img, id, type }) {
  return (
    <div>
      <div>
        <div>
          <img src={img} alt="not found" />
        </div>
      </div>
      <h1>{name}</h1>
      <div>
        <h6>Tipo</h6>
        <p>{type}</p>
      </div>
      <Link to={`/pokemons/${id}`}>
        <button>More</button>
      </Link>
    </div>
  );
}
