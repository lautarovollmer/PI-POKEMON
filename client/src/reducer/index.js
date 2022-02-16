const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  pokemon: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
  }
}

export default rootReducer;
