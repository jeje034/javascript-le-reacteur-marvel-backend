const mongoose = require("mongoose");

const MarvellBookmark = mongoose.model("MarvelBookmark", {
    userId: String,
    bookmarkCategory: String, //"CH" for character, "CO" for comics
    bookmarkId: String, //id of character or id of comics
});

module.exports = MarvellBookmark;
