import {
  GET_POKEMONS,
  GET_POKEMON_ID,
  FILTER_TYPES,
  FILTER_CREATED,
  SORT_POKEMONS,
  ADD_POKEMON,
  GET_NAME_POKEMONS,
  GET_TYPES,
  CLEAR_POKEMON_SEARCH,
  CLEAR_POKEMON_SPECS,
} from "../reducer/types";

//[{name:,id:,hp:,...,types:["fire", "water"]}, {...},{...}]

function filterby(arr, actionPayload) {
  let pokemonsF = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].Type.length; j++) {
      if (arr[i].Type[j].name === actionPayload) {
        pokemonsF.push(arr[i]);
      }
    }
  }
  return pokemonsF;
}

const initialData = {
  pokemonsLoaded: [], //api
  pokemonsShowed: [], //todos los que muestro
  pokemonsFiltered: [], //by api or users
  myPokemons: [], //db
  pokemon: [],
  pokemonSearch: {},
  types: [],
};

export default function rootReducer(state = initialData, action) {
  switch (action.type) {
    case ADD_POKEMON:
      return { ...state, myPokemons: [...state.myPokemons, action.payload] };

    case GET_TYPES:
      return { ...state, types: action.payload };

    case GET_POKEMONS:
      return {
        ...state,
        pokemonsLoaded: action.payload.filter(
          (el) => typeof el.id === "number"
        ),
        pokemonsShowed: action.payload,
        myPokemons: action.payload.filter((el) => typeof el.id === "string"),
        pokemonsFiltered: action.payload,
      };

    case GET_NAME_POKEMONS:
      return { ...state, pokemonsShowed: action.payload };

    case GET_POKEMON_ID:
      return { ...state, pokemon: action.payload };

    case FILTER_CREATED:
      if (action.payload === "created") {
        return { ...state, pokemonsFiltered: state.myPokemons };
      } else if (action.payload === "exists") {
        return { ...state, pokemonsFiltered: state.pokemonsLoaded };
      } else {
        return {
          ...state,
          pokemonsFiltered: state.myPokemons.concat(state.pokemonsLoaded),
        };
      }

    case FILTER_TYPES:
      if (action.payload === "all") {
        return { ...state, pokemonsShowed: state.pokemonsFiltered };
      } else {
        let filteredPokemons = filterby(state.pokemonsFiltered, action.payload);
        return {
          ...state,
          pokemonsShowed: filteredPokemons,
        };
      }

    case SORT_POKEMONS:
      if (action.payload === "low-high") {
        return {
          ...state,
          pokemonsShowed: state.pokemonsShowed.sort((a, b) => {
            return a.attack - b.attack;
          }),
        };
      } else if (action.payload === "high-low") {
        return {
          ...state,
          pokemonsShowed: state.pokemonsShowed.sort((a, b) => {
            return b.attack - a.attack;
          }),
        };
      } else if (action.payload === "Z-A") {
        return {
          ...state,
          pokemonsShowed: state.pokemonsShowed.sort((a, b) => {
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
          pokemonsShowed: state.pokemonsShowed.sort((a, b) => {
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
        return { ...state, pokemonsShowed: state.pokemonsShowed };
      }

    case CLEAR_POKEMON_SPECS:
      return { ...state, pokemon: {} };

    case CLEAR_POKEMON_SEARCH:
      return { ...state, pokemonSearch: {} };

    default:
      return state;
  }
}
