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
//avec peut être  <  1 2 3 4 5 6 7 8 9 > en rouge et blanc
//msgjs21 gérer les <BR> qui se trouvent dans les descriptions

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

const comicRoutes = require("./routes/comic");
app.use(comicRoutes);

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
    res.status(404).json({ error: { message: "Cette route n'existe pas." } });
});

app.listen(process.env.PORT, () => {
    console.log("Server has started.");
});
