const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

//msgjs21 interface rouge et blanche comme le logo
//msgjs21 Faire barre de pagination en haut et en bas
//msgjs21 gérer les <BR> qui se trouvent dans les descriptions

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

app.all("*", (req, res) => {
    res.status(404).json({ error: { message: "Cette route n'existe pas." } });
});

app.listen(process.env.PORT, () => {
    console.log("Server has started.");
});
