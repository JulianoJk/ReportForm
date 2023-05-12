const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

const app = express();
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
app.use(express.json());

app.get("/hello", (req, res) => {
  // const token = req.headers["x-access-token"];

  try {
    // const decoded = jwt.verify(token, process.env.jwt_secret);
    // console.log(decoded.username);
    res.send("Hello!");
  } catch (err) {
    res.send("Access Denied");
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const encrPassw = await bcrypt.hash(req.body.password, 10);
    // q: how check if user with the same username or email already exists
    const user =
      (await User.findOne({
        username: req.body.username,
      })) ||
      (await User.findOne({
        email: req.body.email,
      }));
    if (user) {
      res.json({ status: "error", message: "User already exists" });
      return;
    }
    await User.create({
      username: req.body.username,
      password: encrPassw,
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
      site: req.body.site,
    });
    // sign the JWT token and send it to the user
    const token = jwt.sign(
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        name: req.body.name,
        site: req.body.site,
      },
      process.env.jwt_secret
    );
    res.json({ status: "User created succesfully", token: token });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", code: err["code"] });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    res.json({ status: "error", message: "User not found" });
  }
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (isValid) {
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      process.env.jwt_secret
    );
    res.json({ status: "ok", token: token });
  } else {
    res.json({ status: "error", message: "Wrong credentials" });
  }
});

app.listen(5001, () => {
  console.log("Server started at port 5001");
});
