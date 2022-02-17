import {
  GET_ALL_POKEMONS,
  GET_NAME_POKEMONS,
  FILTER_CREATED,
  FILTER_TYPES,
  GET_TYPES,
  ORDEN_ALFABETICO,
  ORDER_FUERZA,
  GET_DETAILS,
} from "../actions/actionsnames";

import axios from "axios";

export function getPokemon() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: json.data,
    });
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_NAME_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function ordenAlfabetico(payload) {
  return {
    type: ORDEN_ALFABETICO,
    payload,
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({ type: GET_TYPES, payload: json.data });
  };
}

export function filterTypes(payload) {
  return {
    type: FILTER_TYPES,
    payload,
  };
}

export function postPokemon(pokemon) {
  return async function (dispatch) {
    const res = await axios.post(" http://localhost:3001/pokemons", pokemon);
    return res;
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function ordenFuerza(payload) {
  return {
    type: ORDER_FUERZA,
    payload,
  };
}
