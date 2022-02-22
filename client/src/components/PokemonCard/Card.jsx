import React from "react";
import { Link } from "react-router-dom";
import "../PokemonCard/card.css";

export default function Card({ name, img, id, type }) {
  return (
    <div className="card">
      <div>
        <div>
          <img className="imagen" src={img} alt="not found" />
        </div>
      </div>
      <Link to={`/pokemons/${id}`} className="link">
        <h2 className="name">{name}</h2>
      </Link>
      <div>
        <h4 className="typeContainer">Tipo</h4>
        <span className="type">{type}</span>
      </div>
    </div>
  );
}
