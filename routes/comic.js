const express = require("express");
const router = express.Router();
const axios = require("axios"); //npm i axios

//Recherche de 100 comics
router.get("/comics", async (req, res) => {
    try {
        const { limit, skip, title } = req.query;

        let request = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}`;

        if (limit) {
            request += `&limit=${limit}`;
        }
        if (title) {
            request += `&title=${title}`;
        }

        const response = await axios.get(request);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

//Recherche des comics d'un personnage
router.get("/comics/:characterId", async (req, res) => {
    try {
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

module.exports = router;
