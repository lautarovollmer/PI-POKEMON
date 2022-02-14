const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

router.get("/", async function (req, res, next) {
  const { name } = req.query;

  try {
    if (!name) {
      let pokeApi = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0"
      );
      let pokeApiUrl = pokeApi.data.results?.map((el) => axios.get(el.url));

      let pokeApiInfo = await axios.all(pokeApiUrl);

      let pokemonApi = pokeApiInfo.map((el) => {
        let obj = {};
        obj = {
          id: el.data.id,
          name: el.data.name.charAt(0).toUpperCase() + el.data.name.slice(1),
          attack: el.data.stats[1].base_stat,
          image: el.data.sprites.front_default,
          flagId: false,
          types:
            el.data.types.length > 0
              ? el.data.types.map((obj) => obj.type.name)
              : [],
        };
        return obj;
      });

      let pokeDb = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
        },
      });

      let pokemonBd = pokeDb.map((el) => {
        let obj = {
          id: el.id,
          name: el.name.charAt(0).toUpperCase() + el.name.slice(1),
          attack: el.attack,
          image: el.image,
          flagId: el.flagId,
          types: el.Types?.map((obj) => obj.name),
        };
        return obj;
      });

      return res.json([...pokemonApi, ...pokemonBd]);
    } else {
      let pokemonApi = [];

      let pokeDb = await Pokemon.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Type,
          attributes: ["name"],
        },
      });

      let pokemonBd = pokeDb.map((el) => {
        let obj = {
          id: el.id,
          name: el.name.charAt(0).toUpperCase() + el.name.slice(1),
          image: el.image,
          flagId: el.flagId,
          types: el.Types.map((obj) => obj.name),
        };
        return obj;
      });

      if (pokemonBd.length > 0) {
        return res.json(pokemonBd);
      }

      let pokeApi = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then((req) => {
          pokemonApi = [
            {
              id: req.data.id,
              name:
                req.data.name.charAt(0).toUpperCase() + req.data.name.slice(1),
              image: req.data.sprites.front_default,
              flagId: false,
              types:
                req.data.types.length > 0
                  ? req.data.types.map((obj) => obj.type.name)
                  : [],
            },
          ];
        })
        .catch((err) => (pokemonApi = []));

      let pokes = [...pokemonApi];

      if (pokes.length > 0) {
        return res.json(pokes);
      } else {
        return next({ message: "Pokemon Not Found", status: 400 });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/:flagId", async (req, res, next) => {
  const { id, flagId } = req.params;

  if (!id) return next({ message: "Id is require!", status: 500 });
  if (flagId == "true") {
    try {
      let poke = await Pokemon.findByPk(id, { include: [Type] });

      let obj = {
        id: poke.id,
        name: poke.name,
        life: poke.life,
        attack: poke.attack,
        defense: poke.defense,
        speed: poke.speed,
        height: poke.height,
        weight: poke.weight,
        image: poke.image,
        flagId: flagId,
        types: poke.Types?.map((obj) => obj.name),
      };

      return res.json(obj);
    } catch {
      return next({ message: "Pokemon not Found!", status: 500 });
    }
  } else {
    let poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    let obj = {
      id: poke.data.id,
      name: poke.data.name,
      life: poke.data.stats[0].base_stat,
      attack: poke.data.stats[1].base_stat,
      defense: poke.data.stats[2].base_stat,
      speed: poke.data.stats[5].base_stat,
      height: poke.data.height,
      weight: poke.data.weight,
      image: poke.data.sprites.front_default,
      flagId: false,
      types:
        poke.data.types.length > 0
          ? poke.data.types.map((obj) => obj.type.name)
          : [],
    };

    if (obj?.id) return res.json(obj);
    return next({ message: "Pokemon not Found", status: 500 });
  }
});

router.post("/", async (req, res, next) => {
  const { name, life, attack, defense, speed, height, image, weight, types } =
    req.body;

  try {
    const newPoke = await Pokemon.create(
      {
        id: uuidv4(),
        name,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        flagId: true,
      },
      {
        fields: [
          "id",
          "name",
          "life",
          "attack",
          "defense",
          "speed",
          "height",
          "weight",
          "image",
          "flagId",
        ],
      }
    );

    let listTypes = await Promise.all(
      types.map((el) => Type.findOne({ where: { name: el } }))
    );

    newPoke.setTypes(listTypes);

    res.status(200).json(newPoke);
  } catch (error) {
    return next({ message: "Could not create pokemon!", status: 400 });
  }
});

module.exports = router;
