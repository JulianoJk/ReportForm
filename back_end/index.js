const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/user.model");
const ReportSectionOne = require("./models/report.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
app.use(express.json());

app.get("/hello", (req, res) => {
  try {
    res.status(200).send("Hello!");
  } catch (err) {
    res.send("Access Denied");
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const encrPassw = await bcrypt.hash(req.body.password, 10);

    const user =
      (await User.findOne({
        username: req.body.username,
      })) ||
      (await User.findOne({
        email: req.body.email,
      }));
    if (user) {
      res.status(409).json({ status: "error", message: "User already exists" });
      return;
    }
    if (!["admin", "manager", "user"].includes(req.body.role)) {
      res.status(409).json({
        status: "error",
        message: "Role not valid. Available roles: admin, manager, user",
      });
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
    res.status(200).json({ status: "User created succesfully", token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.jwt_secret
      );
      res.status(200).json({ status: "Login succesful", token: token });
      return;
    } else {
      res.status(401).json({ status: "error", message: "Wrong Password!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
    return;
  }
});

app.post("/api/reports", async (req, res) => {
  try {
    const report = await ReportSectionOne.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      dateReported: req.body.dateReported,
      status: req.body.status,
    });
    res
      .status(200)
      .json({ status: "report submitted successfully", report: report });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err });
  }
});

app.listen(5001, () => {
  console.log("Server started at port 5001");
});

// Sample Report JSON for testing in Postman:
// {
//   "firstName": "firstName",
//   "lastName": "lastName",
//   "address": "1281 asd here",
//   "phone": "9413491238123981293",
//   "dateReported": "912831291 12312",
//   "email": "adasodhasuduasda@sadjasdi.com",
//   "message": "iasjdiasjdiasjdidisajd",
//   "status": {
//       "faculty": true,
//       "staff": false,
//       "student": false,
//       "visitor": false,
//       "contractor": false
//   }
// }
