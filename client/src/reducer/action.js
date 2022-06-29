import {
  GET_POKEMONS,
  GET_POKEMON_ID,
  FILTER_TYPES,
  FILTER_CREATED,
  SORT_POKEMONS,
  ADD_POKEMON,
  GET_NAME_POKEMONS,
  GET_TYPES,
  CLEAN_DETAILS_POKEMONS,
} from "../reducer/types";

import axios from "axios";

export function addPokemon(props) {
  return async (dispatch) => {
    const r = await axios.post(
      "https://lautarovollmer-pokemons.herokuapp.com/pokemons/create",
      props
    );
    console.log(r.data);
    dispatch({ type: ADD_POKEMON, payload: r.data });
  };
}

export function getTypes() {
  return async (dispatch) => {
    const r = await axios.get(
      "https://lautarovollmer-pokemons.herokuapp.com/types"
    );
    dispatch({ type: GET_TYPES, payload: r.data });
  };
}
export function getPokemon() {
  return async (dispatch) => {
    const r = await axios.get(
      "https://lautarovollmer-pokemons.herokuapp.com/pokemons"
    );
    dispatch({
      type: GET_POKEMONS,
      payload: r.data,
    });
  };
}
export function getPokemonById(id) {
  return async (dispatch) => {
    const r = await axios.get(
      `https://lautarovollmer-pokemons.herokuapp.com/pokemons/${id}`
    );
    dispatch({ type: GET_POKEMON_ID, payload: r.data });
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    let json = await axios.get(
      `https://lautarovollmer-pokemons.herokuapp.com/pokemons?name=${name}`
    );
    console.log(json.data);
    return dispatch({
      type: GET_NAME_POKEMONS,
      payload: json.data,
    });
  };
}

export function filterTypes(type) {
  return {
    type: FILTER_TYPES,
    payload: type,
  };
}
export function filterCreated(type) {
  return {
    type: FILTER_CREATED,
    payload: type,
  };
}

export function sortPokemons(type) {
  return {
    type: SORT_POKEMONS,
    payload: type,
  };
}

export function cleanDetailsPokemon() {
  console.log("MSG");
  return {
    type: CLEAN_DETAILS_POKEMONS,
  };
}
