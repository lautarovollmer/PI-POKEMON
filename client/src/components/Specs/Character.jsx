import React from "react";

export default function Character(props) {
  const { error, img, name, attack, hp, defense, speed, height, weight, id } =
    props.pokemon;

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {img}
          <h2>{name}</h2>
          <p>
            <span>ID: </span>
            {id}
          </p>
          <p>
            <span>Health: </span>
            {hp}
          </p>
          <p>
            <span>Attack: </span>
            {attack}
          </p>
          <p>
            <span>Defense: </span>
            {defense}
          </p>
          <p>
            <span>Speed: </span>
            {speed}
          </p>
          <p>
            <span>Height: </span>
            {height}
          </p>
          <p>
            <span>Weight: </span>
            {weight}
          </p>
        </div>
      )}
    </>
  );
}
