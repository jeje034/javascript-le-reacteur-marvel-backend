const express = require("express");
const router = express.Router();
const axios = require("axios"); //npm i axios

//Recherche de 100 comics
router.get("/comics", async (req, res) => {
    try {
        let allRead = false;
        let skipForMarvelApi = 0;
        const comics = [];
        let newComics = 0;

        const { limit, skip, title } = req.query;

        while (!allRead) {
            //console.log("avt", skipForMarvelApi);
            let request = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${skipForMarvelApi}&limit=100`;

            if (title) {
                request += `&title=${title}`;
            }

            const response = await axios.get(request);

            newComics = response.data.results.length;

            //console.log("response.data.results", response.data.results);

            Array.prototype.push.apply(comics, response.data.results);

            //console.log(comics.length);

            skipForMarvelApi += 100;

            if (
                !newComics ||
                newComics < 100 ||
                comics.length >= response.data.length
            ) {
                allRead = true;
            }
            allRead = true;
        }
        comics.sort((a, b) => {
            //trim start car au 17/02/21, un titre commence par un espace, ce qui fausse le tri.
            if (a.title.trimStart() < b.title.trimStart()) {
                return -1;
            } else if (a.title.trimStart() > b.title.trimStart()) {
                return 1;
            } else {
                return 0;
            }
        });

        res.status(200).json(comics);
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
