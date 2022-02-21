import Card from "../PokemonCard/Card";
import "../Cards/cards.css";

export default function Cards({ allPokemons }) {
  return (
    <div>
      <ul>
        {allPokemons &&
          allPokemons.map((p) => (
            <li key={p.id}>
              <Card
                name={p.name}
                img={p.image}
                id={p.id}
                type={p.Type[0].name}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
