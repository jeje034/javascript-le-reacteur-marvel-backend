const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const MarvelBookmark = require("../models/MarvelBookmark");

router.post("/bookmark/add", async (req, res) => {
    const { userId, bookmarkCategory, bookmarkId } = req.query;

    try {
        if (!userId || !bookmarkCategory || !bookmarkId) {
            res.status(400).json({
                error: { message: "Missing parameters." },
            });
            return;
        }

        const otherBookmark = await MarvelBookmark.findOne({
            userId: userId,
            bookmarkCategory: bookmarkCategory,
            bookmarkId: bookmarkId,
        });
        if (otherBookmark) {
            res.status(400).json({
                error: { message: "This bookmark already exists." },
            });
            return;
        }

        let newBookmark = new MarvelBookmark({
            userId: userId,
            bookmarkCategory: bookmarkCategory,
            bookmarkId: bookmarkId,
        });

        await newBookmark.save();
        const result = {
            _id: newBookmark._id,
        };
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/bookmark/", async (req, res) => {
    const { userId } = req.query;

    try {
        const bookmarks = await MarvelBookmark.find({ userId: userId });

        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

module.exports = router;
