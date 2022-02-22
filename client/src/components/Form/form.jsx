import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, getTypes } from "../../reducer/action";

export function validate(input) {
  let errors = {};
  for (let key in input) {
    if (key !== "name" && key !== "img") {
      if (!input[key]) {
        errors[key] = "is required";
      } else if (isNaN(input[key])) {
        errors[key] = "must be a number";
      }
    } else {
      if (!input[key] && key !== "img") {
        errors[key] = "name is required";
      } else if (/\d/.test(input[key] && key !== "img")) {
        errors[key] = "only letters";
      } else if (input["img"]) {
        if (
          !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i.test(input["img"])
        ) {
          errors[key] = "only links .jpg .jpeg .png or .gif";
        }
      }
    }
  }
  return errors;
}

export default function CreatePokemon() {
  const [error, setError] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
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
      //console.log(types)
    } else {
      //console.log('ready');
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
    let error = validate(inputs);
    if (!Object.keys(error).length && types.length) {
      alert("Pokemon created!");
      dispatch(addPokemon(inputs));
      setInputs({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
      });
      setTypes([]);
      e.target.reset();
    } else {
      alert("Please, complete the form");
    }
  }

  return (
    <div className="home">
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="stat">
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

          <div className="stat">
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

          <div className="stat">
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

          <div className="stat">
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

          <div className="stat">
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

          <div className="stat">
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

          <div className="stat">
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

          <div className="stat">
            <label>Image Link: </label>
            <input
              name="img"
              type="text"
              value={inputs.img}
              placeholder="img link..."
              onChange={handleInputChange}
            />
            {error.img && <span>{error.img}</span>}
          </div>

          <h3>Choose one or more:</h3>
          <div className="input-types">
            {typesDB &&
              typesDB.map((t) => (
                <div key={`${t.id}`} className="type">
                  <input
                    key={`${t.id}`}
                    type="checkbox"
                    name={`tipos`}
                    value={`${t.name}`}
                    id={`${t.id}`}
                    onChange={handleChecked}
                  />
                  <label htmlFor={`${t.name}`}>{`${t.name}`}</label>
                </div>
              ))}
          </div>
          <input className="create-btn" type="submit" value="Crear" />
        </form>
      </div>
    </div>
  );
}
