const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      id: el.id,
    };
  });
  return apiInfo;
};

module.exports = router;
