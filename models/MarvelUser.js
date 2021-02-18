const mongoose = require("mongoose");

const User = mongoose.model("MarvelUser", {
    email: {
        unique: true,
        type: String,
    },
    token: String,
    hash: String,
    salt: String,
});

module.exports = User;
