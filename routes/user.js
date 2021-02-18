const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const MarvelUser = require("../models/MarvelUser");

router.post("/user/signup", async (req, res) => {
    const { email, password } = req.fields;

    try {
        if (!email || !password) {
            res.status(400).json({
                error: { message: "Missing parameters." },
            });
            return;
        }
        const otherUser = await MarvelUser.findOne({ email: email });
        if (otherUser) {
            res.status(400).json({
                error: { message: "this email has already an account." },
            });
            return;
        }

        let password = password;
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(64);

        let newUser = new MarvelUser({
            email: email ? email : "",
            token: token,
            hash: hash,
            salt: salt,
        });

        await newUser.save();
        const result = {
            _id: newUser._id,
            token: newUser.token,
        };
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/user/login", async (req, res) => {
    const { email, password } = req.fields;

    try {
        const user = await MarvelUser.findOne({ email: email });
        if (
            user &&
            SHA256(password + user.salt).toString(encBase64) === user.hash
        ) {
            res.status(200).json({
                _id: user._id,
                token: user.token,
            });
        } else {
            res.status(401).json({
                error: { message: "Unauthorized" },
            });
        }
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

module.exports = router;
