const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");

// OBTENER TODOS LOS POKEMON EN RUTA '/' O POR QUERY

router.get("/", async (req, res, next) => {
  let name = req.query.name;
  if (name) {
    name = name.toLowerCase();

    //OBTENER POKEMON POR QUERY
    try {
      let normalizeApi = [];
      const nameApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      if (nameApi.data) {
        normalizeApi.push({
          id: nameApi.data.id,
          name: nameApi.data.name.toUpperCase(),
          hp: nameApi.data.stats[0].base_stat,
          attack: nameApi.data.stats[1].base_stat,
          defense: nameApi.data.stats[2].base_stat,
          speed: nameApi.data.stats[5].base_stat,
          height: nameApi.data.height,
          weight: nameApi.data.weight,
          image:
            nameApi.data.sprites.versions["generation-v"]["black-white"]
              .animated.front_default,
          Type: nameApi.data.types.map((t) => {
            return { name: t.type.name };
          }),
        });
        res.send(normalizeApi.length > 0 ? normalizeApi : []);
      } else {
        let nameQuery = await Pokemon.findAll({
          include: {
            Type: true,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          where: {
            name: {
              [Op.iLike]: "%" + name + "%",
            },
          },
          order: [["name", "ASC"]],
        });

        // NORMALIZAR TODOS LOS POKEMONS PARA QUE SOLO TRAIGA LOS DATA QUE QUIERO DE CADA POKEMON
        let normalizePokemonDb = [];
        normalizePokemonDb.push({
          id: nameQuery[0]?.dataValues.id,
          name: nameQuery[0]?.dataValues.name.toUpperCase(),
          attack: nameQuery[0]?.dataValues.attack,
          defense: nameQuery[0]?.dataValues.defense,
          speed: nameQuery[0]?.dataValues.speed,
          height: nameQuery[0]?.dataValues.height,
          weight: nameQuery[0]?.dataValues.weight,
          image: nameQuery[0]?.dataValues.image,
          Type: nameQuery[0]?.dataValues.types.map((n) => {
            return { name: n.name };
          }),
          description: nameQuery[0]?.dataValues.description,
          createInDb: nameQuery[0]?.dataValues.createInDb,
        });
        res.send(normalizePokemonDb.length > 0 ? normalizePokemonDb : []);
      }
    } catch {
      res.send("pokemon not found");
    }

    // OBTENER POKEMONS DE BASE DE DATOS
  } else {
    try {
      const include = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      // NORMALIZAR TODOS LOS POKEMONS PARA QUE SOLO TRAIGA LOS DATA QUE QUIERO DE CADA POKEMON DE BASE DE DATOS
      let normalize = [];

      for (var i = 0; i < include.length; i++) {
        if (include[i].dataValues.createInDb) {
          normalize.push({
            id: include[i].dataValues.id,
            name: include[i].dataValues.name.toUpperCase(),
            hp: include[i].dataValues.hp,
            attack: include[i].dataValues.attack,
            defense: include[i].dataValues.defense,
            speed: include[i].dataValues.speed,
            height: include[i].dataValues.height,
            weight: include[i].dataValues.weight,
            image: include[i].dataValues.image,
            Type: include[i].dataValues.Types,
            description: include[i].dataValues.description,
            createInDb: include[i].dataValues.createInDb,
          });
        } else {
          normalize.push({
            id: include[i].dataValues.id,
            name: include[i].dataValues.name.toUpperCase(),
            hp: include[i].dataValues.hp,
            attack: include[i].dataValues.attack,
            defense: include[i].dataValues.defense,
            speed: include[i].dataValues.speed,
            height: include[i].dataValues.height,
            weight: include[i].dataValues.weight,
            image: include[i].dataValues.image,
            Type: include[i].dataValues.types.map((n) => {
              return { name: n.name };
            }),
            description: include[i].dataValues.description,
            createInDb: include[i].dataValues.createInDb,
          });
        }
      }

      // OBTENER TODOS LOS POKEMONS DE LA API

      let apiLink = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      );
      apiLink = apiLink.data.results;
      let subrequest = apiLink.map((el) => axios.get(el.url));
      let promesaCumplida = await Promise.all(subrequest);

      promesaCumplida = await promesaCumplida.map((poke) => {
        return {
          id: poke.data.id,
          name: poke.data.name.toUpperCase(),
          hp: poke.data.stats[0].base_stat,
          attack: poke.data.stats[1].base_stat,
          defense: poke.data.stats[2].base_stat,
          speed: poke.data.stats[5].base_stat,
          height: poke.data.height,
          weight: poke.data.weight,
          image:
            poke.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
          Type: poke.data.types.map((t) => {
            return { name: t.type.name };
          }),
        };
      });

      let allPokemones = [...normalize, ...promesaCumplida];
      res.send(allPokemones);
    } catch (error) {
      next(error);
    }
  }
});

// OBTENER TODOS LOS POKEMONS POR PARAMS {ID}

// OBTENER POKEMON DE API POR PARAMS {ID}
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  if (id.length < 5) {
    try {
      let normalizedApiId = [];
      let idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      idApi = idApi.data;
      let subrequest2 = await axios.get(idApi.species.url);
      if (idApi) {
        normalizedApiId.push({
          id: idApi.id,
          name: idApi.name.toUpperCase(),
          description: subrequest2.data.flavor_text_entries[8].flavor_text,
          hp: idApi.stats[0].base_stat,
          attack: idApi.stats[1].base_stat,
          defense: idApi.stats[2].base_stat,
          speed: idApi.stats[5].base_stat,
          height: idApi.height,
          weight: idApi.weight,
          image: idApi.sprites.other.dream_world.front_default,
          Type: idApi.types.map((t) => {
            return { name: t.type.name };
          }),
        });
      }
      res.send(normalizedApiId);
    } catch {}

    // OBTENER POKEMON DE BASE DE DATOS POR PARAMS {ID}
  } else {
    try {
      let idParams = await Pokemon.findOne({
        where: { id: id },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      let normalizePokemonIdDb = [];
      normalizePokemonIdDb.push({
        id: idParams?.dataValues.id,
        name: idParams?.dataValues.name.toUpperCase(),
        hp: idParams?.dataValues.hp,
        attack: idParams?.dataValues.attack,
        defense: idParams?.dataValues.defense,
        speed: idParams?.dataValues.speed,
        height: idParams?.dataValues.height,
        weight: idParams?.dataValues.weight,
        image: idParams?.dataValues.image,
        Type: idParams?.dataValues.Types,
        description: idParams?.dataValues.description,
      });
      res.send(normalizePokemonIdDb);
    } catch (error) {
      next(error);
    }
  }
});

// CREAR UN POKEMON EN LA BASE DE DATOS

router.post("/create", async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;

  try {
    let pokemonExist = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (pokemonExist) return res.json({ msg: "Pokemon existente" });

    let newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image: image,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
    });

    let pokemonType = await Type.findAll({
      where: {
        name: {
          [Op.in]: Array.isArray(types) ? types : [types],
        },
      },
    });

    await newPokemon.setTypes(pokemonType);
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
