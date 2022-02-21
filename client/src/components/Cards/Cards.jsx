import Card from "../PokemonCard/Card";
import "../Cards/cards.css";

export default function Cards({ allPokemons }) {
  return (
    <div className="page">
      <ul className="list">
        {allPokemons &&
          allPokemons.map((p) => (
            <li key={p.id}>
              <Card name={p.name} img={p.img} id={p.id} type={p.type} />
            </li>
          ))}
      </ul>
    </div>
  );
}
