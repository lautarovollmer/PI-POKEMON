import React from "react";

export default function ({ pokemonPage, pokemons, paged }) {
  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(pokemons / pokemonPage) - 1; i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumber?.map((n) => (
          <button onClick={() => paged(n)} key={n}>
            {n}
          </button>
        ))}
      </ul>
    </nav>
  );
}
