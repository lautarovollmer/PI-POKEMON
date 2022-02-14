const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/", async function (req, res, next) {
  try {
    let tiposApi = await axios.get("https://pokeapi.co/api/v2/type");
    tiposApi = tiposApi.data.results.filter(
      (el) => el.name !== "unknown" && el.name !== "shadow"
    );
    tiposApi = tiposApi
      .map((el) => el.name)
      .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

    return res.json(tiposApi);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
