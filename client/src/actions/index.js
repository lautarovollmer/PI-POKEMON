import axios from "axios";

export function getPokemon() {
  return async function (dispatch) {
    var json = await axios.get("/api/pokemon");
    return dispatch({
      type: "GET_POKEMON",
      payload: json.data,
    });
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/api/pokemon?name=${name}`);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
