import Card from "../PokemonCard/Card";
import "../Cards/cards.css";

export default function Cards({ allPokemons }) {
  return (
    <div className="cardContainer">
      {allPokemons &&
        allPokemons.map((p) => (
          <Card name={p.name} img={p.image} id={p.id} type={p.Type[0].name} />
        ))}
    </div>
  );
}
