const express = require("express");
const router = express.Router();
const axios = require("axios"); //npm i axios

//Recherche des personnages
router.get("/characters", async (req, res) => {
    try {
        const { limit, skip, name } = req.query;

        let request = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`;

        if (limit) {
            request += `&limit=${limit}`;
        }

        if (skip) {
            request += `&skip=${skip}`;
        }

        if (name) {
            request += `&name=${name}`;
        }

        console.log(request);

        const response = await axios.get(request);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

module.exports = router;
