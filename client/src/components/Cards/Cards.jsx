import React from "react";
import { useState } from "react";
import Card from "../PokemonCard/Card";

export default function Cards({ allPokemons }) {
  const [currentPage, setCurrentPage] = useState(0);

  let nextPage = () => {
    if (allPokemons.length <= currentPage + 12) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 12);
  };

  let prevPage = () => {
    if (currentPage < 11) {
      setCurrentPage(0);
    } else setCurrentPage(currentPage - 12);
  };

  const filterP = allPokemons.slice(currentPage, currentPage + 12);

  const PageOne = () => {
    setCurrentPage(0);
  };

  if (currentPage > allPokemons.length) {
    PageOne(0);
  }
  return (
    <>
      <div>
        {currentPage !== 0 ? (
          <button onClick={prevPage}>&#11164;</button>
        ) : (
          <div></div>
        )}
        {currentPage !== 40 ? (
          <button onClick={nextPage}>&#11166;</button>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {filterP &&
          filterP.map((p) => (
            <Card name={p.name} img={p.image} type={p.Type[0].name} />
          ))}
      </div>
    </>
  );
}
