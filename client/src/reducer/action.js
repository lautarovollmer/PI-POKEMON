import {
  GET_POKEMONS,
  GET_POKEMON_ID,
  GET_POKEMON_NAME,
  GET_TYPES,
  FILTER_ORIGIN_POKEMON,
  FILTER_TYPE_POKEMON,
  SORT_POKEMONS,
  ADD_POKEMON,
  CLEAR_POKEMON_SEARCH,
  CLEAR_POKEMON_SPECS,
} from "./types";

import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({ type: GET_TYPES, payload: json.data });
  };
}

export function getPokemonById(id) {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/${id}`);
    dispatch({ type: GET_POKEMON_ID, payload: res.data });
  };
}

export function filterPokemonsByOrigin(type) {
  return {
    type: FILTER_ORIGIN_POKEMON,
    payload: type,
  };
}

export function filterPokemonsByType(type) {
  return {
    type: FILTER_TYPE_POKEMON,
    payload: type,
  };
}

export function sortPokemons(type) {
  return {
    type: SORT_POKEMONS,
    payload: type,
  };
}

export function addPokemon(specs) {
  return (dispatch) => {
    axios.post("http://localhost:3001/pokemons", specs).then((r) => {
      dispatch({ type: ADD_POKEMON, payload: r.data });
    });
  };
}

export function clearPokemonSpecs() {
  return { type: CLEAR_POKEMON_SPECS };
}

export function clearPokemonSearch() {
  return { type: CLEAR_POKEMON_SEARCH };
}
