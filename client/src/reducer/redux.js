import {
  GET_POKEMONS,
  GET_POKEMON_NAME,
  GET_POKEMON_ID,
  GET_TYPES,
  FILTER_ORIGIN_POKEMON,
  FILTER_TYPE_POKEMON,
  SORT_POKEMONS,
  ADD_POKEMON,
  CLEAR_POKEMON_SEARCH,
  CLEAR_POKEMON_SPECS,
} from "./types";

function filterby(arr, actionPayload) {
  let pokemonsFilter = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].types.length; j++) {
      if (arr[i].types[j].name === actionPayload) {
        pokemonsF.push(arr[i]);
      }
    }
  }
  return pokemonsFilter;
}

const initialState = {
  pokemon: [], // api
  allPokemons: [], // todos los que muestro
  pokemonsFiltered: [], // pokemons por api o users
  myPokemons: [], // pokemons de la base de datos
  pokemonsSpecs: {},
  pokemonSearch: {},
  types: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload.filter((el) => typeof el.id === "number"),
        allPokemons: action.paylaod,
        myPokemons: action.payload.filter((el) => typeof el.id === "string"),
        pokemonsFiltered: action.payload,
      };

    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemonSearch: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_POKEMON_ID:
      return {
        ...state,
        pokemonSpecs: action.payload,
      };

    case FILTER_ORIGIN_POKEMON:
      if (action.payload === "created") {
        return { ...state, pokemonsFiltered: state.myPokemons };
      } else if (action.payload === "exists") {
        return {
          ...state,
          pokemonsFiltered: state.myPokemons.concat(state.pokemon),
        };
      }

    case FILTER_TYPE_POKEMON:
      if (action.payload === "alltype") {
        return { ...state, allPokemons: state.pokemonsFiltered };
      } else {
        let pokemonesFiltrados = filterby(
          state.pokemonsFiltered,
          action.paylaod
        );
        return {
          ...state,
          allPokemons: pokemonesFiltrados,
        };
      }

    case SORT_POKEMONS:
      if (action.payload === "low-high") {
        return {
          ...state,
          allPokemons: state.allPokemons.sort((a, b) => {
            return a.attack - b.attack;
          }),
        };
      } else if (action.payload === "high-low") {
        return {
          ...state,
          allPokemons: state.allPokemons.sort((a, b) => {
            return b.attack - a.attack;
          }),
        };
      } else if (action.payload === "Z-A") {
        return {
          ...state,
          allPokemons: state.allPokemons.sort((a, b) => {
            let aName = a.name.toLowerCase();
            let bName = b.name.toLowerCase();
            if (aName < bName) {
              return 1;
            }
            if (aName > bName) {
              return -1;
            }
            return 0;
          }),
        };
      } else if (action.payload === "A-Z") {
        return {
          ...state,
          allPokemons: state.allPokemons.sort((a, b) => {
            let aName = a.name.toLowerCase();
            let bName = b.name.toLowerCase();
            if (aName > bName) {
              return 1;
            }
            if (aName < bName) {
              return -1;
            }
            return 0;
          }),
        };
      } else {
        return { ...state, allPokemons: state.allPokemons };
      }

    case ADD_POKEMON:
      return { ...state, myPokemons: [...state.myPokemons, actionPayload] };

    case CLEAR_POKEMON_SPECS:
      return { ...state, pokemonSpecs: {} };

    case CLEAR_POKEMON_SEARCH:
      return { ...state, pokemonSearch: {} };

    default:
      return state;
  }
}
