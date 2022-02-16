const express = require("express");
const router = express.Router();
const { Type } = require("../db.js");
const { default: axios } = require("axios");

router.get("/", async (req, res, next) => {
  try {
    let allTypes = await axios.get("https://pokeapi.co/api/v2/type");
    let todosTypes = allTypes.data.results;

    todosTypes.forEach((item) => {
      Type.findOrCreate({
        where: {
          name: item.name,
        },
      });
    });
    const typesDb = await Type.findAll();
    res.send(typesDb);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
