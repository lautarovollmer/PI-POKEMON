import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortPokemons, filterCreated, filterTypes } from "../../reducer/action";
import "../Filter/filter.css";

export default function Filter() {
  const [order, setOrder] = useState("");
  const [filterTipos, setFilterTipos] = useState("all");
  const [filter, setFilter] = useState("all");

  const myPokemons = useSelector((store) => store.myPokemons);
  const types = useSelector((store) => store.types);
  const dispatch = useDispatch();

  const handleChangeFilter = (e) => {
    //by origin
    setFilter(e.target.value);
  };

  const handleChangeTypes = (e) => {
    //by type
    setFilterTipos(e.target.value);
  };

  const handleChangeOrder = (e) => {
    //sort
    setOrder(e.target.value);
  };

  useEffect(() => {
    dispatch(filterCreated(filter));
    dispatch(filterTypes(filterTipos));
    dispatch(sortPokemons(order));
  }, [filter, filterTipos, order]);

  return (
    <div className="filter">
      <div>
        <label className="order" htmlFor="order">
          Order by:
        </label>
        <select className="select" name="order" onChange={handleChangeOrder}>
          <option value="none">None</option>
          <option value="high-low">More strong</option>
          <option value="low-high">More weak</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div>
        <label className="order" htmlFor="filter">
          Filter by origin:{" "}
        </label>
        <select
          className="select"
          name="filter"
          onChange={(e) => {
            handleChangeFilter(e);
          }}
        >
          <option value="all">All</option>
          {myPokemons.length ? (
            <option value="created">Created by users</option>
          ) : null}
          <option value="exists">Pokemons Api</option>
        </select>
      </div>

      <div>
        <label className="order" htmlFor="types">
          Filter by type:{" "}
        </label>
        <select
          className="select"
          name="Types"
          onChange={(e) => {
            handleChangeTypes(e);
          }}
        >
          <option value="all">All types</option>
          {types &&
            types.map((t) => (
              <option
                key={`${t.name}`}
                value={`${t.name}`}
              >{`${t.name}`}</option>
            ))}
        </select>
      </div>
    </div>
  );
}
