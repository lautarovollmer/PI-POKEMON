import React from "react";
import styles from "../PokemonCard/Card.module.css";

export default function Card({ name, img, type, attack }) {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <h6>Tipo</h6>
        <p>{type}</p>
      </div>
      <div>
        <h6>Attack</h6>
        <p>{attack}</p>
        <div>
          <img src={img} alt="img not found" />
        </div>
      </div>
    </div>
  );
}
