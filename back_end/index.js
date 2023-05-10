const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

const app = express();
mongoose.connect(
  "mongodb+srv://" +
    process.env.mongo_user +
    ":" +
    process.env.mongo_password +
    "@cluster0.jnw32.mongodb.net/ehs"
);
app.use(express.json());

app.get("/hello", (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    console.log(decoded.username);
    res.send("Hello!");
  } catch (err) {
    res.send("Access Denied");
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const encrPassw = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      password: encrPassw,
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
      site: req.body.site,
    });
    res.json({ status: "ok" });
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
