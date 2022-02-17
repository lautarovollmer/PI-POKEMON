import React from "react";
import Card from "../PokemonCard/Card";

export default function Cards({ allPokemons }) {
  return (
    <div>
      {allPokemons?.map(
        (p) => (
          console.log(p),
          (
            <Card
              name={p.name}
              img={
                p.image == null || p.image == undefined ? p.image : "not found"
              }
              type={p.Type[0].name}
              attack={p.attack}
            />
          )
        )
      )}
    </div>
  );
}
