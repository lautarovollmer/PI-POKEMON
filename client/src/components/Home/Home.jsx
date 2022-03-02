import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, getTypes } from "../../reducer/action";
import Cards from "../Cards/Cards";
import Filter from "../Filter/Filter";
import Paginado from "../Paginado/Paginado";
import Search from "../SearchBar/SearchBar";
import "../Home/home.css";
import Nav from "../Nav/Nav";

export default function Home() {
  const dispatch = useDispatch();
  const pokemonsShowed = useSelector((store) => store.pokemonsShowed);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokmnPerPage] = useState(12);
  const indexOfLastPokmn = currentPage * pokmnPerPage;
  const indexOfFirstPokmn = indexOfLastPokmn - pokmnPerPage;
  const currentPokmn = pokemonsShowed.slice(
    indexOfFirstPokmn,
    indexOfLastPokmn
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonsShowed]);

  const handleRefresh = () => {
    dispatch(getPokemon());
    setCurrentPage(1);
  };

  return (
    <div className="home">
      <h1>POKÉDEX</h1>
      <Nav />
      <Search />
      <Filter />
      <Paginado
        pokmnPerPage={pokmnPerPage}
        totalPokmn={pokemonsShowed.length}
        paginate={paginate}
      />
      <div>
        <button className="restart" onClick={() => handleRefresh()}>
          HOME
        </button>
      </div>
      {pokemonsShowed === "pokemon not found" && <div>Pokemon not found</div>}
      {pokemonsShowed.length > 0 && Array.isArray(pokemonsShowed) && (
        <Cards className="card" allPokemons={currentPokmn} />
      )}

      {pokemonsShowed.length === 0 && (
        <div>
          <img
            src="https://www.animatedimages.org/data/media/1446/animated-pokemon-image-0005.gif"
            alt="loadin-pokemons"
            height="70"
            width="70px"
          />
          <br />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}
