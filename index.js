const express = require("express");
const formidableMiddelware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidableMiddelware());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, //Ajout pour éviter un warning car on a un modèle avec unique: true,
});

//msgjs21 interface rouge et blanche comme le logo
//msgjs21 Faire barre de pagination en haut et en bas
//avec peut être  <  1 2 3 4 5 6 7 8 9 > en rouge et blanc. Si tmemps, quand on clique sur 9, on passe à 15 par exemple, comme sur le bon coin
// Gros coeur rouge ou blanc (favori ou non favori) avec 2 petits coeurs dans le même carré que le gros avec un + et un - pour ajouter et enlever (si temps)
//si pas temps on ajoute les favoris en cliquan sur l'unique coeur par comic/person des pages 1 et 2 et on voit les favoris en p 3
//Si temps car necessite de modifier les getcomics et characters pour y indiquer si l'élément est fovoris ou plus simplement de charger les favoris et de faire un lookup
//faire dans un 1er temps le minimu demandé(mais avec les favoris dans le base)
//msgjs21 gérer les <BR> qui se trouvent dans les descriptions

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

const userRoutes = require("./routes/user");
app.use(userRoutes);

const bookmarkRoutes = require("./routes/bookmark");
app.use(bookmarkRoutes);

app.all("*", (req, res) => {
    res.status(404).json({ error: { message: "This route doesn't exist." } });
});

app.listen(process.env.PORT, () => {
    console.log("Server has started.");
});
