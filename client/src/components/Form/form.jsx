import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, getTypes } from "../../reducer/action";
import { validate } from "./validate.js";
import "../Form/form.css";
import { Link } from "react-router-dom";

export default function Form() {
  const [error, setError] = useState({});

  const [inputs, setInputs] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
  });

  const [types, setTypes] = useState([]);
  const typesDB = useSelector((store) => store.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChecked(e) {
    if (e.target.checked) {
      setTypes([...types, e.target.value]);
    } else {
      let pos = types.indexOf(e.target.id);
      types.splice(pos, 1);
    }
  }

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!Object.keys(error).length && types.length) {
      alert("Pokemon created!");
      dispatch(addPokemon({ ...inputs, types: types }));
      setInputs({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
      });
      setTypes([]);
      e.target.reset();
    } else {
      alert("Please, complete the fields");
    }
  }

  return (
    <>
      <div style={{ paddingTop: "2rem" }}>
        <Link className="link-f" to="/home">
          Home
        </Link>
      </div>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="stats">
            <label>Name: </label>
            <input
              name="name"
              type="text"
              value={inputs.name}
              placeholder="name"
              onChange={handleInputChange}
            />
            {error.name && <span>{error.name}</span>}
          </div>
          <div className="stats">
            <label>Health: </label>
            <input
              name="hp"
              type="text"
              value={inputs.hp}
              placeholder="hp"
              onChange={handleInputChange}
            />
            {error.hp && <span>{error.hp}</span>}
          </div>

          <div className="stats">
            <label>Attack: </label>
            <input
              name="attack"
              type="text"
              value={inputs.attack}
              placeholder="attack"
              onChange={handleInputChange}
            />
            {error.attack && <span>{error.attack}</span>}
          </div>

          <div className="stats">
            <label>Defense: </label>
            <input
              name="defense"
              type="text"
              value={inputs.defense}
              placeholder="defense"
              onChange={handleInputChange}
            />
            {error.defense && <span>{error.defense}</span>}
          </div>

          <div className="stats">
            <label>Speed: </label>
            <input
              name="speed"
              type="text"
              value={inputs.speed}
              placeholder="speed"
              onChange={handleInputChange}
            />
            {error.speed && <span>{error.speed}</span>}
          </div>

          <div className="stats">
            <label>Height: </label>
            <input
              name="height"
              type="text"
              value={inputs.height}
              placeholder="height"
              onChange={handleInputChange}
            />
            {error.height && <span>{error.height}</span>}
          </div>

          <div className="stats">
            <label>Weight: </label>
            <input
              name="weight"
              type="text"
              value={inputs.weight}
              placeholder="weight"
              onChange={handleInputChange}
            />
            {error.weight && <span>{error.weight}</span>}
          </div>

          <div className="stats">
            <label>Image Link: </label>
            <input
              name="image"
              type="text"
              value={inputs.image}
              placeholder="img link..."
              onChange={handleInputChange}
            />
            {error.img && <span>{error.img}</span>}
          </div>

          <h3>Choose your type</h3>
          <div className="input-types">
            {typesDB &&
              typesDB.map((t) => (
                <div key={`${t.id}`} className="type-f">
                  <input
                    key={`${t.id}`}
                    type="checkbox"
                    name={`tipos`}
                    value={`${t.name}`}
                    id={`${t.id}`}
                    onChange={(e) => handleChecked(e)}
                  />
                  <label htmlFor={`${t.name}`}>{`${t.name}`}</label>
                </div>
              ))}
          </div>
          <input className="btn-f" type="submit" value="Create" />
        </form>
      </div>
    </>
  );
}
