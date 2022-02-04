const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");
const saltRounds = 10;

router.post("/auth/signup", async (req, res, next) => {
  try {
    const { email, password, name, image } = req.body;

    if (email === "" || password === "" || name === "") {
      res.status(400).json({ message: "Provide email, password and name." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json({ message: "Provide a valid email" });
      return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
      image,
    });

    const user = {
      _id: createdUser._id,
      email: createdUser.email,
      name: createdUser.name,
      image: createdUser.image,
    };

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password" });
      return;
    }

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({ message: "Provide a valid email" });
      return;
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password);

    if (passwordCorrect) {
      const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
        image: foundUser.image,
      };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "12h",
      });

      res.status(200).json({ authToken: authToken });
    } else if (!passwordCorrect) {
      res.status(401).json({ message: "Unable to login the user" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/auth/verify", isAuthenticated, async (req, res, next) => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
