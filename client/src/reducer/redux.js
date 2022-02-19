import {
  GET_ALL_POKEMONS,
  GET_NAME_POKEMONS,
  FILTER_CREATED,
  FILTER_TYPES,
  GET_TYPES,
  ORDEN_ALFABETICO,
  ORDER_FUERZA,
  GET_DETAILS,
} from "../reducer/types";

const initialState = {
  pokemon: [],
  allPokemons: [],
  arrayTypes: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_NAME_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
      };

    case GET_DETAILS:
      return {
        ...state,
      };

    case FILTER_CREATED:
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((el) => el.createInDb)
          : state.allPokemons.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons: createdFilter,
      };

    case FILTER_TYPES:
      let allFilterTypes = state.allPokemons;
      let filtrar = allFilterTypes.filter((el) =>
        el.type.map((t) => t.name).includes(action.payload)
      );
      return {
        ...state,
        pokemons: filtrar,
      };

    case ORDEN_ALFABETICO:
      let sortArr =
        action.payload === "asc"
          ? state.pokemon.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : state.pokemon.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortArr,
      };
    case ORDER_FUERZA:
      let ordenFuerza =
        action.payload === "asc"
          ? state.pokemon.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemon.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: ordenFuerza,
      };

    default:
      return state;
  }
}

export default rootReducer;
